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

function RequestItem({ request, onSupport, onTake }) {
    return (
        <div className="request-item fade-in">
            <h4>{request.title}</h4>
            <p>{request.description}</p>
            <div className="request-stats">
                <span>Поддержали: {request.supportCount}</span>
                {request.deputies.length > 0 && (
                    <span>В работе: {request.deputies.join(', ')}</span>
                )}
            </div>
            <div className="request-actions">
                <button
                    className="btn support"
                    onClick={() => onSupport(request.id)}
                >
                    👍 Поддержать
                </button>
                <button
                    className="btn take"
                    onClick={() => onTake(request.id)}
                >
                    🚩 Взять в работу
                </button>
            </div>
        </div>
    );
}

function AdminComponent() {
    // mock top-рекомендации
    const [topRequests, setTopRequests] = useState([]);

    useEffect(() => {
        const mock = [
            {
                id: 1,
                title: 'Бесплатный интернет в парках',
                description: 'Просьба обеспечить Wi-Fi в городских парках.',
                supportCount: 24,
                deputies: [],
            },
            {
                id: 2,
                title: 'Ремонт дорог',
                description: 'Необходимо отремонтировать дорогу на улице Ленина.',
                supportCount: 15,
                deputies: ['Иванова (СП)'],
            },
            {
                id: 3,
                title: 'Открытие новой школы',
                description: 'Строительство школы на северо-западе города.',
                supportCount: 30,
                deputies: ['Петров (ЕДР)', 'Сидоров (ЯБЛОКО)'],
            },
        ];
        setTopRequests(mock);
    }, []);

    const handleSupport = (id) => {
        setTopRequests(prev =>
            prev.map(r =>
                r.id === id ? { ...r, supportCount: r.supportCount + 1 } : r
            )
        );
    };

    const handleTake = (id) => {
        const currentDeputy = 'ТекущийДепутат (СП)'; // заменить реальным именем
        setTopRequests(prev =>
            prev.map(r =>
                r.id === id && !r.deputies.includes(currentDeputy)
                    ? { ...r, deputies: [...r.deputies, currentDeputy] }
                    : r
            )
        );
    };

    return (
        <div className="admin-container">
            <NavBar />
            <main className="admin-main">
                <header className="admin-header fade-in">
                    <h2 className="admin-title">Топ обращений</h2>
                    <p className="admin-description">
                        Здесь отображаются предложения, которые можно поддержать и взять в работу.
                    </p>
                </header>

                <section id="top-requests" className="requests-section">
                    {topRequests.map(req => (
                        <RequestItem
                            key={req.id}
                            request={req}
                            onSupport={handleSupport}
                            onTake={handleTake}
                        />
                    ))}
                </section>
            </main>
        </div>
    );
}

export default AdminComponent;
