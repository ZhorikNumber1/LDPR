import styled from 'styled-components';
import { FaChevronDown } from 'react-icons/fa';

const InputContainer = styled.div`
    margin-bottom: 1rem;
    position: relative;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.black};
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color ${({ theme }) => theme.transitions.fast};

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    border-radius: 4px;
    font-size: 1rem;
    min-height: 120px;
    resize: vertical;
    transition: border-color ${({ theme }) => theme.transitions.fast};

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
    }
`;

const SelectWrapper = styled.div`
    position: relative;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 4px;
  font-size: 1rem;
  appearance: none;
  background-color: white;
  transition: border-color ${({ theme }) => theme.transitions.fast};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
  }

  ${({ error, theme }) => error && `
    border-color: #e53935;
    &:focus {
      box-shadow: 0 0 0 2px rgba(229, 57, 53, 0.2);
    }
  `}
`;

const SelectIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${({ theme }) => theme.colors.grayDark};
`;

const ErrorMessage = styled.div`
  color: #e53935;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

export const Input = ({ label, icon, error, ...props }) => {
    return (
        <InputContainer>
            {label && <Label>{label}</Label>}
            <div style={{ position: 'relative' }}>
                <StyledInput {...props} error={error} />
                {icon && (
                    <div style={{
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#666'
                    }}>
                        {icon}
                    </div>
                )}
            </div>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </InputContainer>
    );
};

export const TextAreaInput = ({ label, error, ...props }) => {
    return (
        <InputContainer>
            {label && <Label>{label}</Label>}
            <TextArea {...props} />
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </InputContainer>
    );
};

export const SelectInput = ({
                                label,
                                options,
                                placeholder,
                                error,
                                ...props
                            }) => {
    return (
        <InputContainer>
            {label && <Label>{label}</Label>}
            <SelectWrapper>
                <StyledSelect {...props} error={error}>
                    {placeholder && <option value="">{placeholder}</option>}
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </StyledSelect>
                <SelectIcon>
                    <FaChevronDown size={14} />
                </SelectIcon>
            </SelectWrapper>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </InputContainer>
    );
};