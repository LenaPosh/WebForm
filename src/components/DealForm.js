import React, { useState, useEffect } from 'react';
import './DealForm.css';
import axios from "axios";
import Select from 'react-select';


const DealForm = () => {
    const [client, setClient] = useState('');
    const [currency1, setCurrency1] = useState('');
    const [currency2, setCurrency2] = useState('');
    const [commission, setCommission] = useState('');
    const [amount, setAmount] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    // const [isCurrency1Selected, setIsCurrency1Selected] = useState(false);

    const [clients, setClients] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [deals, setDeals] = useState([]);
    const [date, setDate] = useState('');
    const [profit, setProfit] = useState('');
    const [comment, setComment] = useState('');
    const [rate, setRate] = useState('');
    const [rateFee, setRateFee] = useState('');

    const [operators, setOperators] = useState([]); // Состояние для хранения списка операторов (пользователей)
    const [selectedOperator, setSelectedOperator] = useState(null);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [selectedCurrency1, setSelectedCurrency1] = useState(null);
    const [selectedCurrency2, setSelectedCurrency2] = useState(null);

    const [googleCurrencyRate, setGoogleCurrencyRate] = useState(null);
    const [xeCurrencyRate, setXeCurrencyRate] = useState(null);




    useEffect(() => {
        axios.get('http://18.215.164.227:8001/clients')
            .then(response => setClients(response.data.data))
            .catch(error => console.error('Error fetching clients:', error));

        axios.get('http://18.215.164.227:8001/currencies')
            .then(response => setCurrencies(response.data.data))
            .catch(error => console.error('Error fetching currencies:', error));

        axios.get('http://18.215.164.227:8001/deals')
            .then(response => setDeals(response.data.data))
            .catch(error => console.error('Error fetching deals:', error));

        // Получите список операторов (пользователей) и сохраните его в состоянии
        axios.get('http://18.215.164.227:8001/operators')
            .then(response => setOperators(response.data.data))
            .catch(error => console.error('Error fetching operators:', error));
    }, []);


    useEffect(() => {
        if (currencies.length > 0) { // Проверка, что массив валют не пуст
            const usdCurrency = currencies.find(c => c.short_name === 'USD');
            if (usdCurrency) {
                setSelectedCurrency1({ value: usdCurrency.id, label: usdCurrency.short_name });
                setCurrency1(usdCurrency.id);
            }
        }
    }, [currencies]);

    const fetchCurrencyRate = (currency1Id, currency2Id, setRateFunction, rateType) => {
        console.log(`Fetching ${rateType} Rate:`, currency1Id, currency2Id);
        if (currency1Id && currency2Id) {
            axios.get(`http://18.215.164.227:8001/exchange_rates/${currency1Id}/${currency2Id}`)
                .then(response => {
                    console.log("Response data:", response.data);
                    if (response.data && response.data.data) {
                        let rateValue = response.data.data[rateType.toLowerCase()];
                        if (rateValue !== undefined) {
                            setRateFunction(`${rateType} Rate: ${rateValue.toFixed(2)}`);
                        } else {
                            console.error(`${rateType} data is not available`);
                        }
                    } else {
                        console.error(`No data available in the response`);
                    }
                })
                .catch(error => {
                    console.error(`Error fetching ${rateType} currency rate:`, error);
                });
        }
    };




    const fetchGoogleRate = (currency1Id, currency2Id) => {
        fetchCurrencyRate(currency1Id, currency2Id, setGoogleCurrencyRate, "Google");
    };

    const fetchXERate = (currency1Id, currency2Id) => {
        fetchCurrencyRate(currency1Id, currency2Id, setXeCurrencyRate, "XE");
    };


    const handleGoogleRateClick = () => {
        if (googleCurrencyRate) {
            const rateValue = googleCurrencyRate.split(': ')[1];
            setRate(rateValue);
        }
    };

    const handleXERateClick = () => {
        if (xeCurrencyRate) {
            const rateValue = xeCurrencyRate.split(': ')[1];
            setRate(rateValue);
        }
    };




    const handleCurrency1Change = (selectedOption) => {
        const currency1Id = selectedOption ? currencies.find(c => c.short_name === selectedOption.value)?.id : null;
        console.log('Currency 1 ID:', currency1Id);
        setCurrency1(currency1Id);
        setSelectedCurrency1(selectedOption);

        if (currency1Id && currency2) {
            fetchGoogleRate(currency1Id, currency2);
            fetchXERate(currency1Id, currency2);
        }
    };

    const handleCurrency2Change = (selectedOption) => {
        const currency2Id = selectedOption ? currencies.find(c => c.short_name === selectedOption.value)?.id : null;
        console.log('Currency 2 ID:', currency2Id);
        setCurrency2(currency2Id);
        setSelectedCurrency2(selectedOption);

        if (currency1 && currency2Id) {
            fetchGoogleRate(currency1, currency2Id);
            fetchXERate(currency1, currency2Id);
        }
    };





    useEffect(() => {
        if (isModalVisible) {
            const currentDate = new Date();
            const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
            const formattedTime = `${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
            setDate(`${formattedDate} ${formattedTime}`);
        }
    }, [isModalVisible]);

    useEffect(() => {
        if (isModalVisible) {
            const modalContent = document.querySelector('.modal-content-cash');
            if (modalContent) {
                modalContent.scrollTop = 0;
            }
        }
    }, [isModalVisible]);


    useEffect(() => {
        const rateValue = parseFloat(rate) || 0;
        const commissionPercent = parseFloat(commission) || 0;
        const commissionValue = rateValue * (commissionPercent / 100);
        const rateFeeValue = rateValue + commissionValue;
        setRateFee(rateFeeValue.toFixed(2));
    }, [rate, commission]);




    useEffect(() => {
        const amountValue = parseFloat(amount) || 0;
        const rateFeeValue = parseFloat(rateFee) || 0;
        const feeAmount = amountValue * (rateFeeValue / 100);
        const totalAmountValue = amountValue - feeAmount;
        setTotalAmount(totalAmountValue.toFixed(2));

    }, [amount, rateFee]);



    useEffect(() => {
        const amountValue = parseFloat(amount) || 0;
        const totalAmountValue = parseFloat(totalAmount) || 0;
        const profitValue = amountValue - totalAmountValue;
        setProfit(profitValue.toFixed(2));
    }, [amount, totalAmount]); // Зависимость от amount и totalAmount для вычисления profit



    const handleCommissionChange = (e) => {
        setCommission(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };
    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleProfitChange = (e) => {
        setProfit(e.target.value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };
    const handleRateChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
            setRate(value);
        }
    };

    const handleRateFeeChange = (e) => {
        setRateFee(e.target.value);
    };

    const handleOperatorChange = (selectedOption) => {
        setSelectedOperator(selectedOption);
    };

    const handleClientChange = (selectedOption) => {
        setClient(selectedOption);
    };

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleAddDeal = () => {
        if (client) {
            const clientID = client ? client.value.id : null;
            if (clientID !== undefined) {
            } else {
                console.error('Client not found');
            }

            const operatorID = selectedOperator ? selectedOperator.value : null;
            console.log('Selected currencies:', currency1, currency2);

            // const currencyInId = currencies.find(c => c.short_name === currency1)?.id;
            // const currencyOutId = currencies.find(c => c.short_name === currency2)?.id;
            //
            // if (!currencyInId || !currencyOutId) {
            //     console.error('Currency IDs not found');
            //     return;
            // }

            const currentDate = new Date();
            const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;

            const newDeal = {
                users_id: operatorID,
                clients_id: clientID,
                date_deal: formattedDate,
                currencyin: currency1,
                currencyout: currency2,
                amountin: amount,
                amountout: totalAmount,
                rate: rate,
                fee: commission,
                rate_fee: rateFee,
                profit: profit,
                comments: comment,
            };

            console.log('Sending deal data:', newDeal);

            axios.post('http://18.215.164.227:8001/deal', newDeal, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log('Deal added successfully:', response);
                    setIsModalVisible(false);
                })
                .catch(error => {
                    console.error('Error adding deal:', error);
                });
        } else {
            console.error('Client not found');
        }

        setDate('');
        setClient('');
        setSelectedCurrency1(null);
        setSelectedCurrency2(null);
        setCommission('');
        setAmount('');
        setTotalAmount('');
        setProfit('');
        setComment('');
        setRate('');
        setRateFee('');
    };





    return (
        <div className="deal-form-container">
            <button onClick={handleOpenModal}>
                <span style={{ marginRight: '5px',  fontSize: '20px'  }}>+</span>
                Add Deal</button>
            <div className={`modal-cash ${isModalVisible ? 'active' : ''}`}>
                <div className="modal-content-cash" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                    <style>
                        {`
                        .modal-content-cash::-webkit-scrollbar {
                            width: 8px;
                        }

                        .modal-content-cash::-webkit-scrollbar-thumb {
                            background-color: lightgray;
                            border-radius: 4px;
                        }

                        .modal-content-cash::-webkit-scrollbar-thumb:hover {
                            background-color: #7a3a8c;
                        }
                    `}
                    </style>

                    <label>
                        Date:
                        <input type="text" value={date} onChange={handleDateChange}/>
                    </label>
                    <label>
                        Client:
                        <Select
                            className="custom-select"
                            value={client}
                            onChange={handleClientChange}
                            options={clients.map((clientOption) => ({
                                value: clientOption,
                                label: clientOption.name
                            }))}
                            isSearchable={true}
                            placeholder="Select Client"
                            classNamePrefix="custom-select"

                        />
                    </label>
                    <label>
                        Operator:
                        <Select
                            className="custom-select"
                            value={selectedOperator}
                            onChange={handleOperatorChange}
                            options={operators.map((operatorOption) => ({
                                value: operatorOption.id,
                                label: operatorOption.login,
                            }))}
                            isSearchable={true}
                            placeholder="Select Operator"
                            classNamePrefix="custom-select"
                        />
                    </label>
                    <label>
                        Currency In:
                        <Select
                            className="custom-select"
                            value={selectedCurrency1}
                            onChange={handleCurrency1Change}
                            options={currencies.map((currencyOption) => ({
                                value: currencyOption.short_name,
                                label: currencyOption.short_name,
                            }))}
                            isSearchable={true}
                            placeholder="Select Currency"
                            classNamePrefix="custom-select"
                        />
                    </label>

                    <label>
                        Currency Out:
                        <Select
                            className="custom-select"
                            value={selectedCurrency2}
                            onChange={handleCurrency2Change}
                            options={currencies.filter(currencyOption => currencyOption.short_name !== (selectedCurrency1 ? selectedCurrency1.value : null)).map((currencyOption) => ({
                                value: currencyOption.short_name,
                                label: currencyOption.short_name,
                            }))}
                            isSearchable={true}
                            placeholder="Select Currency"
                            classNamePrefix="custom-select"
                        />
                    </label>
                    <label>
                        Rate:
                        <input type="text" value={rate} onChange={handleRateChange}/>
                        <button className="button-rate" onClick={handleGoogleRateClick}>
                            {googleCurrencyRate || 'Google Rate'}
                        </button>
                        <button className="button-rate" onClick={handleXERateClick}>
                            {xeCurrencyRate || 'XE Rate'}
                        </button>
                    </label>



                    <label>
                        Rate Fee:
                        <input type="text" value={rateFee} onChange={handleRateFeeChange}/>
                    </label>
                    <label>
                        Commission:
                        <input type="text" value={commission} onChange={handleCommissionChange}/>
                    </label>

                    <label>
                        Amount:
                        <input type="text" value={amount} onChange={handleAmountChange}/>
                    </label>

                    <label>
                        Total Amount:
                        <input type="text" value={totalAmount} readOnly/>
                    </label>
                    <label>
                        Profit:
                        <input type="text" value={profit} onChange={handleProfitChange}/>
                    </label>


                    <label>
                        Comment:
                        <input
                            type="text"
                            value={comment}
                            onChange={handleCommentChange}
                            style={{ height: '70px', marginRight: '10px', padding: '10px 20px', overflowY: 'auto', marginTop: '0' }}
                        />
                    </label>

                    <div className="buttons-container">
                        <button className="close-button" onClick={handleAddDeal}>Add Deal</button>
                        <button className="close-button" style={{marginLeft: '10px'}} onClick={handleCloseModal}>Close</button>

                    </div>
                </div>
            </div>

            {/* Таблица для отображения сделок */}

            <table className="deals-table">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Client</th>
                    <th>Currency 1</th>
                    <th>Currency 2</th>
                    <th>Rate</th>
                    <th>Rate Fee</th>
                    <th>Commission</th>
                    <th>Amount</th>
                    <th>Total Amount</th>
                    <th>Profit</th>
                    <th>Comment</th>
                </tr>
                </thead>
                <tbody>
                {deals.map((deal, index) => (
                    <tr key={index}>
                        <td>{deal.date_deal ? new Date(deal.date_deal).toLocaleString() : 'Нет данных'}</td>
                        <td>{deal.client_name + " " + deal.client_last_name}</td>
                        <td>{deal.c1}</td>
                        <td>{deal.c2}</td>
                        <td>{deal.rate}</td>
                        <td>{deal.rate_fee}</td>
                        <td>{deal.fee}</td>
                        <td>{deal.amountin}</td>
                        <td>{deal.amountout}</td>
                        <td>{deal.profit}</td>
                        <td>{deal.comments}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
export default DealForm;