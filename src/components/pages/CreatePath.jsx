import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {NavLink, useNavigate} from 'react-router-dom';
import {FaFileAlt, FaUserEdit, FaHashtag, FaPaperPlane, FaFire, FaEdit, FaComments, FaUsers} from 'react-icons/fa';
import { Card, CardTitle } from '../common/Card';
import { PrimaryButton, SecondaryButton } from '../common/Button';
import { Input, TextAreaInput, SelectInput } from '../common/Input';

const PetitionFormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FullWidthField = styled.div`
  grid-column: 1 / -1;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  grid-column: 1 / -1;
`;

const CategoryTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primaryDark};
  border-radius: 20px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

const TagInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const TagInput = styled.input`
  padding: 0.25rem 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 4px;
  min-width: 120px;
`;

const HomePageLayout = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
`;

const AddTagButton = styled(SecondaryButton)`
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
`;

const PreviewSection = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.grayLight};
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1rem;
`;

const PreviewTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const PreviewContent = styled.div`
  white-space: pre-wrap;
  line-height: 1.6;
`;

// Категории петиций
const PETITION_CATEGORIES = [
    { value: 'social', label: 'Социальная политика' },
    { value: 'ecology', label: 'Экология' },
    { value: 'education', label: 'Образование' },
    { value: 'healthcare', label: 'Здравоохранение' },
    { value: 'transport', label: 'Транспорт' },
    { value: 'urban', label: 'Городское развитие' },
    { value: 'economy', label: 'Экономика' },
    { value: 'rights', label: 'Права человека' },
]
const NavTabs = styled.nav`
        display: flex;
        border-bottom: 1px solid ${({theme}) => theme.colors.gray};
        margin-bottom: 2rem;
        overflow-x: auto;
    `;

const Tab = styled(NavLink)`
        padding: 1rem 1.5rem;
        font-weight: 600;
        color: ${({theme}) => theme.colors.grayDark};
        border-bottom: 3px solid transparent;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        white-space: nowrap;
        transition: all ${({theme}) => theme.transitions.fast};

        &:hover {
            color: ${({theme}) => theme.colors.primary};
        }

        &.active {
            color: ${({theme}) => theme.colors.primary};
            border-bottom-color: ${({theme}) => theme.colors.primary};
        }
    `;


class CreatePetition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            category: '',
            tags: [],
            newTag: '',
            authorName: '',
            authorContact: '',
            isPreview: false,
            errors: {}
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
            errors: {
                ...this.state.errors,
                [name]: null
            }
        });
    };

    handleAddTag = () => {
        if (this.state.newTag.trim() && !this.state.tags.includes(this.state.newTag.trim())) {
            this.setState({
                tags: [...this.state.tags, this.state.newTag.trim()],
                newTag: ''
            });
        }
    };

    handleRemoveTag = (tagToRemove) => {
        this.setState({
            tags: this.state.tags.filter(tag => tag !== tagToRemove)
        });
    };

    handleKeyDown = (e) => {
        if (e.key === 'Enter' && this.state.newTag.trim()) {
            this.handleAddTag();
            e.preventDefault();
        }
    };

    validateForm = () => {
        const errors = {};
        if (!this.state.title.trim()) errors.title = 'Введите название петиции';
        if (!this.state.description.trim()) errors.description = 'Введите описание петиции';
        if (!this.state.category) errors.category = 'Выберите категорию';
        if (!this.state.authorName.trim()) errors.authorName = 'Введите ваше имя';

        this.setState({ errors });
        return Object.keys(errors).length === 0;
    };

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.validateForm()) {
            // В реальном приложении здесь будет отправка данных на сервер
            console.log('Петиция отправлена:', {
                title: this.state.title,
                description: this.state.description,
                category: this.state.category,
                tags: this.state.tags,
                author: {
                    name: this.state.authorName,
                    contact: this.state.authorContact
                }
            });

            // Перенаправление после успешного создания
            this.props.navigate('/', { state: { success: true } });
        }
    };

    togglePreview = () => {
        this.setState({ isPreview: !this.state.isPreview });
    };

    render() {
        const {
            title,
            description,
            category,
            tags,
            newTag,
            authorName,
            authorContact,
            isPreview,
            errors
        } = this.state;


        return (
            <HomePageLayout>
                <>
                    <NavTabs>
                        <Tab to="/" end>
                            <FaFire/> Главная
                        </Tab>
                        <Tab to="/create_peth">
                            <FaEdit/> Создать петицию
                        </Tab>
                        <Tab to="/chat">
                            <FaComments/> Чат с партиями
                        </Tab>
                        <Tab to="/parts">
                            <FaUsers/> Статистика партий
                        </Tab>
                    </NavTabs>
                </>
            <PetitionFormContainer
            >
                <Card
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <CardTitle>
                        <FaFileAlt style={{ marginRight: '0.5rem' }} />
                        Создание новой петиции
                    </CardTitle>

                    <form onSubmit={this.handleSubmit}>
                        <FormGrid>
                            <FullWidthField>
                                <Input
                                    label="Название петиции*"
                                    name="title"
                                    value={title}
                                    onChange={this.handleChange}
                                    placeholder="Краткое и понятное название"
                                    error={errors.title}
                                    icon={<FaFileAlt />}
                                />
                            </FullWidthField>

                            <FullWidthField>
                                <TextAreaInput
                                    label="Описание проблемы*"
                                    name="description"
                                    value={description}
                                    onChange={this.handleChange}
                                    placeholder="Подробно опишите проблему и ваши предложения по ее решению"
                                    rows={8}
                                    error={errors.description}
                                />
                            </FullWidthField>

                            <SelectInput
                                label="Категория*"
                                name="category"
                                value={category}
                                onChange={this.handleChange}
                                options={PETITION_CATEGORIES}
                                placeholder="Выберите категорию"
                                error={errors.category}
                            />

                            <div>
                                <label>Теги (необязательно)</label>
                                <TagInputContainer>
                                    {tags.map(tag => (
                                        <CategoryTag key={tag}>
                                            #{tag}
                                            <button
                                                type="button"
                                                onClick={() => this.handleRemoveTag(tag)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: 'inherit',
                                                    marginLeft: '0.25rem',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                ×
                                            </button>
                                        </CategoryTag>
                                    ))}
                                    <TagInput
                                        type="text"
                                        value={newTag}
                                        onChange={(e) => this.setState({ newTag: e.target.value })}
                                        onKeyDown={this.handleKeyDown}
                                        placeholder="Добавить тег"
                                    />
                                    <AddTagButton
                                        type="button"
                                        onClick={this.handleAddTag}
                                        disabled={!newTag.trim()}
                                    >
                                        Добавить
                                    </AddTagButton>
                                </TagInputContainer>
                            </div>

                            <Input
                                label="Ваше имя*"
                                name="authorName"
                                value={authorName}
                                onChange={this.handleChange}
                                placeholder="Как к вам обращаться"
                                error={errors.authorName}
                                icon={<FaUserEdit />}
                            />

                            <Input
                                label="Контактные данные"
                                name="authorContact"
                                value={authorContact}
                                onChange={this.handleChange}
                                placeholder="Email или телефон"
                                icon={<FaHashtag />}
                            />
                        </FormGrid>

                        {isPreview && (
                            <PreviewSection
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                transition={{ duration: 0.3 }}
                            >
                                <PreviewTitle>Предпросмотр петиции</PreviewTitle>
                                <h4>{title}</h4>
                                <PreviewContent>{description}</PreviewContent>
                                <div style={{ marginTop: '1rem' }}>
                                    <strong>Категория:</strong> {PETITION_CATEGORIES.find(c => c.value === category)?.label}
                                </div>
                                {tags.length > 0 && (
                                    <div style={{ marginTop: '0.5rem' }}>
                                        <strong>Теги:</strong> {tags.map(tag => `#${tag}`).join(', ')}
                                    </div>
                                )}
                            </PreviewSection>
                        )}

                        <FormActions>
                            <SecondaryButton
                                type="button"
                                onClick={this.togglePreview}
                                disabled={!title || !description}
                            >
                                {isPreview ? 'Скрыть предпросмотр' : 'Предпросмотр'}
                            </SecondaryButton>
                            <PrimaryButton type="submit">
                                <FaPaperPlane style={{ marginRight: '0.5rem' }} />
                                Опубликовать петицию
                            </PrimaryButton>
                        </FormActions>
                    </form>
                </Card>
            </PetitionFormContainer>
            </HomePageLayout>
        );
    }
}

export default function CreatePetitionWrapper(props) {
    const navigate = useNavigate();
    return <CreatePetition {...props} navigate={navigate} />;
}