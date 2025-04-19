import { useState } from 'react';
import styled from 'styled-components';
import { PrimaryButton } from '../common/Button';
import { Input, TextAreaInput } from '../common/Input';

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

function PetitionForm() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Петиция "${formData.title}" отправлена на рассмотрение!`);
        setFormData({
            title: '',
            description: '',
            category: '',
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                label="Название петиции"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
            />

            <TextAreaInput
                label="Описание"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
            />

            <Input
                label="Категория"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
            />

            <ButtonContainer>
                <PrimaryButton type="submit">Отправить петицию</PrimaryButton>
            </ButtonContainer>
        </Form>
    );
}

export default PetitionForm;