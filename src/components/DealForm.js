import React, { useState, useEffect } from 'react';
import './DealForm.css';

const DealForm = () => {
    // Состояния для хранения данных формы
    const [client, setClient] = useState('');
    const [currency1, setCurrency1] = useState('');
    const [currency2, setCurrency2] = useState('');
    const [commission, setCommission] = useState('');
    const [amount, setAmount] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [isCurrency1Selected, setIsCurrency1Selected] = useState(false);


    // Списки для выбора
    const clientsList = ['Client1', 'Client2', 'Client3']; // Ваши клиенты
    const currenciesList = ['USD', 'EUR', 'GBP']; // Ваши валюты

    // Состояние для хранения данных таблицы
    const [deals, setDeals] = useState([]);

    // Обработчик изменения валюты 1
    const handleCurrency1Change = (e) => {
        const selectedCurrency1 = e.target.value;
        setCurrency1(selectedCurrency1);

        // Если выбрана валюта 1, установите isCurrency1Selected в true, иначе в false
        setIsCurrency1Selected(!!selectedCurrency1);

        // Если валюта 1 не выбрана, сбросьте выбор валюты 2
        if (!selectedCurrency1) {
            setCurrency2('');
        }
    };


    // Обработчик изменения валюты 2
    const handleCurrency2Change = (e) => {
        setCurrency2(e.target.value);
    };

    // Обработчик изменения комиссии
    const handleCommissionChange = (e) => {
        setCommission(e.target.value);
    };

    // Обработчик изменения суммы
    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    // Обработчик нажатия кнопки "Добавить"
    const handleAddDeal = () => {
        // Ваши действия при добавлении сделки
        const newDeal = {
            client,
            currency1,
            currency2,
            commission,
            amount,
            totalAmount,
        };

        // Добавляем новую сделку к существующему массиву сделок
        setDeals([...deals, newDeal]);

        // Очищаем форму
        setClient('');
        setCurrency1('');
        setCurrency2('');
        setCommission('');
        setAmount('');
        setTotalAmount('');
    };

    // Обработчик нажатия кнопки "Сохранить"
    const handleSaveDeal = () => {
        // Ваши действия при сохранении сделки
        console.log('Сохранена сделка:', deals);
        // Дополнительная логика, если нужна
    };

    // Обновление суммы к выдаче при изменении комиссии или суммы
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
                <button onClick={handleSaveDeal}>Save Deal</button>
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
