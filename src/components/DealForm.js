import React, { useState, useEffect } from 'react';
import './DealForm.css';

const DealForm = () => {
    const [client, setClient] = useState('');
    const [currency1, setCurrency1] = useState('');
    const [currency2, setCurrency2] = useState('');
    const [commission, setCommission] = useState('');
    const [amount, setAmount] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [isCurrency1Selected, setIsCurrency1Selected] = useState(false);


    const clientsList = ['Client1', 'Client2', 'Client3'];
    const currenciesList = ['USD', 'EUR', 'GBP'];

    const [deals, setDeals] = useState([]);

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

    const handleAddDeal = () => {
        const newDeal = {
            client,
            currency1,
            currency2,
            commission,
            amount,
            totalAmount,
        };

        setDeals([...deals, newDeal]);

        setClient('');
        setCurrency1('');
        setCurrency2('');
        setCommission('');
        setAmount('');
        setTotalAmount('');
    };

    const handleSaveDeal = () => {

        console.log('Сохранена сделка:', deals);
    };

    useEffect(() => {
        const commissionValue = parseFloat(commission) || 0;
        const amountValue = parseFloat(amount) || 0;
        const totalAmountValue = amountValue - commissionValue;
        setTotalAmount(totalAmountValue.toFixed(2));
    }, [commission, amount]);

    return (
        <div className="deal-form-container">
            <label>
                Client:
                <select value={client} onChange={(e) => setClient(e.target.value)}>
                    <option value="">Select Client</option>
                    {clientsList.map((clientOption) => (
                        <option key={clientOption} value={clientOption}>
                            {clientOption}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Currency 1:
                <select value={currency1} onChange={handleCurrency1Change}>
                    <option value="">Select Currency</option>
                    {currenciesList.map((currencyOption) => (
                        <option key={currencyOption} value={currencyOption}>
                            {currencyOption}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Currency 2:
                <select value={currency2} onChange={handleCurrency2Change} disabled={isCurrency1Selected}>
                    <option value="">Select Currency</option>
                    {currenciesList.map((currencyOption) => (
                        <option key={currencyOption} value={currencyOption}>
                            {currencyOption}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Commission:
                <input type="text" value={commission} onChange={handleCommissionChange} />
            </label>

            <label>
                Amount:
                <input type="text" value={amount} onChange={handleAmountChange} />
            </label>

            <label>
                Total Amount:
                <input type="text" value={totalAmount} readOnly />
            </label>

            <div className="buttons-container">
                <button onClick={handleAddDeal}>Add Deal</button>
                {/*<button onClick={handleSaveDeal}>Save Deal</button>*/}
            </div>

            {/* Таблица для отображения сделок */}
            <table className="deals-table">
                <thead>
                <tr>
                    <th>Client</th>
                    <th>Currency 1</th>
                    <th>Currency 2</th>
                    <th>Commission</th>
                    <th>Amount</th>
                    <th>Total Amount</th>
                </tr>
                </thead>
                <tbody>
                {deals.map((deal, index) => (
                    <tr key={index}>
                        <td>{deal.client}</td>
                        <td>{deal.currency1}</td>
                        <td>{deal.currency2}</td>
                        <td>{deal.commission}</td>
                        <td>{deal.amount}</td>
                        <td>{deal.totalAmount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DealForm;
