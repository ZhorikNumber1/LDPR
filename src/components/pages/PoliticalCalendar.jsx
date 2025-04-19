import { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { CardContent } from '../common/Card';

const CalendarContainer = styled.div`
  .react-calendar {
    width: 100%;
    border: none;
    font-family: inherit;
    box-shadow: none;
  }

  .react-calendar__tile {
    padding: 0.75em 0.5em;
    border-radius: 4px;
    transition: all ${({ theme }) => theme.transitions.fast};
  }

  .react-calendar__tile--active {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  .react-calendar__tile--now {
    background: ${({ theme }) => theme.colors.primaryLight};
  }

  .react-calendar__tile--hasActive {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  .react-calendar__tile:hover {
    background: ${({ theme }) => theme.colors.gray};
  }
`;

const EventsList = styled.ul`
  margin-top: 1.5rem;
`;

const EventItem = styled.li`
  padding: 1rem;
  margin-bottom: 0.5rem;
  background-color: ${({ theme }) => theme.colors.grayLight};
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const EventDate = styled.div`
  min-width: 60px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 0.5rem;
  border-radius: 4px;
`;

const EventDay = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1;
`;

const EventMonth = styled.div`
  font-size: 0.75rem;
  text-transform: uppercase;
`;

const EventTitle = styled.div`
  font-weight: 600;
`;

// Заглушка данных о событиях
const EVENTS = [
    { id: 1, date: new Date(2023, 6, 15), title: 'Заседание Государственной Думы' },
    { id: 2, date: new Date(2023, 6, 20), title: 'Встреча с избирателями' },
    { id: 3, date: new Date(2023, 6, 25), title: 'Обсуждение нового законопроекта' },
    { id: 4, date: new Date(2023, 7, 5), title: 'Парламентские слушания' },
    { id: 5, date: new Date(2023, 7, 12), title: 'Пресс-конференция' },
];

function PoliticalCalendar() {
    const [date, setDate] = useState(new Date());

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const hasEvent = EVENTS.some(event =>
                event.date.getDate() === date.getDate() &&
                event.date.getMonth() === date.getMonth() &&
                event.date.getFullYear() === date.getFullYear()
            );

            return hasEvent ? <div style={{ height: '4px', width: '4px', backgroundColor: '#1a5fb4', borderRadius: '50%', margin: '0 auto' }} /> : null;
        }
    };

    const selectedDateEvents = EVENTS.filter(event =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );

    return (
        <CardContent>
            <CalendarContainer>
                <Calendar
                    onChange={setDate}
                    value={date}
                    locale={ru}
                    tileContent={tileContent}
                />
            </CalendarContainer>

            <EventsList>
                <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ margin: '1.5rem 0 1rem' }}
                >
                    События на {format(date, 'd MMMM yyyy', { locale: ru })}
                </motion.h3>

                {selectedDateEvents.length > 0 ? (
                    selectedDateEvents.map(event => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <EventItem>
                                <EventDate>
                                    <EventDay>{format(event.date, 'd')}</EventDay>
                                    <EventMonth>{format(event.date, 'MMM', { locale: ru })}</EventMonth>
                                </EventDate>
                                <EventTitle>{event.title}</EventTitle>
                            </EventItem>
                        </motion.div>
                    ))
                ) : (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        На выбранную дату событий не запланировано.
                    </motion.p>
                )}
            </EventsList>
        </CardContent>
    );
}

export default PoliticalCalendar;