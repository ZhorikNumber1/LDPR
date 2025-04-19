import React, { useState, useEffect } from 'react';
import './AdminComponent.css';

function NavBar() {
    return (
        <nav className="admin-nav">
            <ul>
                <li><a href="#dashboard">Панель</a></li>
                <li><a href="#requests">Обращения</a></li>
                <li><a href="#settings">Настройки</a></li>
            </ul>
        </nav>
    );
}

function RequestItem({ request, onApprove, onReject }) {
    return (
        <div className="request-item fade-in">
            <h4>{request.title}</h4>
            <p>{request.description}</p>
            <div className="request-actions">
                <button className="btn approve" onClick={() => onApprove(request.id)}>Принять</button>
                <button className="btn reject" onClick={() => onReject(request.id)}>Отклонить</button>
            </div>
        </div>
    );
}

function AdminComponent() {
    const [requests, setRequests] = useState([]);

    // Mock data load
    useEffect(() => {
        const mock = [
            { id: 1, title: 'Обращение пользователя Иванова', description: 'Просьба добавить новую фичу.' },
            { id: 2, title: 'Обращение пользователя Петровой', description: 'Сообщение об ошибке при входе.' },
            { id: 3, title: 'Обращение пользователя Сидорова', description: 'Запрос на удаление аккаунта.' },
        ];
        setTimeout(() => setRequests(mock), 500); // эмуляция загрузки
    }, []);

    const handleApprove = (id) => {
        setRequests(prev => prev.filter(r => r.id !== id));
        // здесь можно добавить уведомление или логику
    };

    const handleReject = (id) => {
        setRequests(prev => prev.filter(r => r.id !== id));
    };

    return (
        <div className="admin-container">
            <NavBar />
            <main className="admin-main">
                <header className="admin-header fade-in">
                    <h2 className="admin-title">Административная страница</h2>
                    <p className="admin-description">Здесь вы можете просмотреть и модерать обращения пользователей.</p>
                </header>

                <section id="requests" className="requests-section">
                    {requests.length > 0 ? (
                        requests.map(req => (
                            <RequestItem
                                key={req.id}
                                request={req}
                                onApprove={handleApprove}
                                onReject={handleReject}
                            />
                        ))
                    ) : (
                        <p className="no-requests fade-in">Нет новых обращений.</p>
                    )}
                </section>
            </main>
        </div>
    );
}

export default AdminComponent;