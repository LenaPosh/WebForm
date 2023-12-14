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
    const [isCurrency1Selected, setIsCurrency1Selected] = useState(false);

    const [clients, setClients] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [deals, setDeals] = useState([]);
    const [date, setDate] = useState('');
    const [profit, setProfit] = useState('');
    const [comment, setComment] = useState('');
    const [rate, setRate] = useState('');
    const [rateFee, setRateFee] = useState('');

    const [operators, setOperators] = useState([]); // Состояние для хранения списка операторов (пользователей)
    const [selectedOperator, setSelectedOperator] = useState('');

    const [isModalVisible, setIsModalVisible] = useState(false);

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
    const handleCurrency1Change = (e) => {
        const selectedCurrency1 = e.target.value;
        setCurrency1(selectedCurrency1);

        setIsCurrency1Selected(!!selectedCurrency1);

        if (!selectedCurrency1) {
            setCurrency2('');
        }
    };

    const handleCurrency2Change = (e) => {
        setCurrency2(e.target.value);
    };

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
        setRate(e.target.value);
    };

    const handleRateFeeChange = (e) => {
        setRateFee(e.target.value);
    };

    const handleOperatorChange = (e) => {
        setSelectedOperator(e.target.value);
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
            const clientID = client.value.id;
            if (clientID !== undefined) {
            } else {
                console.error('Client not found');
            }
            const currencyInId = currencies.find(c => c.short_name === currency1)?.id;
            const currencyOutId = currencies.find(c => c.short_name === currency2)?.id;

            const currentDate = new Date();
            const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;

            const newDeal = {
                users_id: selectedOperator,
                clients_id: clientID,
                date_deal: formattedDate,
                currencyin: currencyInId,
                currencyout: currencyOutId,
                amountin: amount,
                amountout: totalAmount,
                rate: rate,
                fee: commission,
                rate_fee: rateFee,
                profit: profit,
                comments: comment,
            };

            axios.post('http://18.215.164.227:8001/deal', newDeal, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                })
                .catch(error => {
                    console.error('Error adding deal:', error);
                });
        } else {
            console.error('Client not found');
        }


        setDate('');
        setClient('');
        setCurrency1('');
        setCurrency2('');
        setCommission('');
        setAmount('');
        setTotalAmount('');
        setProfit('');
        setComment('');
        setRate('');
        setRateFee('');
    };


    useEffect(() => {
        const commissionValue = parseFloat(commission) || 0;
        const amountValue = parseFloat(amount) || 0;
        const totalAmountValue = amountValue - commissionValue;
        setTotalAmount(totalAmountValue.toFixed(2));
    }, [commission, amount]);


    return (
        <div className="deal-form-container">
            <button onClick={handleOpenModal}>Add Deal</button>
            <div className={`modal-cash ${isModalVisible ? 'active' : ''}`}>
                <div className="modal-content-cash" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                    {/* Кнопка для закрытия модального окна */}

                    <label>
                        Date:
                        <input type="date" value={date} onChange={handleDateChange}/>
                    </label>
                    <label>
                        Client:
                        <Select
                            value={client} // Установите объект клиента, а не только id
                            onChange={handleClientChange}
                            options={clients.map((clientOption) => ({
                                value: clientOption,
                                label: clientOption.name
                            }))}
                            isSearchable={true}
                            placeholder="Select Client"
                        />
                    </label>
                    <label>
                        Operator:
                        <select value={selectedOperator} onChange={handleOperatorChange}>
                            <option value="">Select Operator</option>
                            {operators.map((operatorOption) => (
                                <option key={operatorOption.id} value={operatorOption.id}>
                                    {operatorOption.login}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Currency 1:
                        <select value={currency1} onChange={handleCurrency1Change}>
                            <option value="">Select Currency</option>
                            {currencies.map((currencyOption) => (
                                <option key={currencyOption.id} value={currencyOption.short_name}>
                                    {currencyOption.short_name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Currency 2:
                        <select value={currency2} onChange={handleCurrency2Change}>
                            <option value="">Select Currency</option>
                            {currencies.map((currencyOption) => (
                                <option key={currencyOption.id} value={currencyOption.short_name}>
                                    {currencyOption.short_name}
                                </option>
                            ))}
                        </select>
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
                        Rate:
                        <input type="text" value={rate} onChange={handleRateChange}/>
                    </label>

                    <label>
                        Rate Fee:
                        <input type="text" value={rateFee} onChange={handleRateFeeChange}/>
                    </label>

                    <label>
                        Comment:
                        <textarea value={comment} onChange={handleCommentChange}/>
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
                    <th>Commission</th>
                    <th>Amount</th>
                    <th>Total Amount</th>
                    <th>Rate</th>
                    <th>Profit</th>
                    <th>Rate Fee</th>
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
                        <td>{deal.fee}</td>
                        <td>{deal.amountin}</td>
                        <td>{deal.amountout}</td>
                        <td>{deal.rate}</td>
                        <td>{deal.profit}</td>
                        <td>{deal.rate_fee}</td>
                        <td>{deal.comments}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
export default DealForm;