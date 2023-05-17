import styled from "styled-components"

export const ButtonSecondary = styled.button`
	padding: 0.2rem;
	background-color: transparent;
	border: ${({ theme }) => theme.colors.main};
	border-radius: 3px;

	&:hover {
		background-color: ${({ theme }) => theme.colors.shadowMain};
	}
`