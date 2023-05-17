import * as S from "./styles"

interface Props {
    isDarkTheme: boolean
    setTheme: (value: string) => void
}

const ChangeTheme = ({isDarkTheme, setTheme}: Props) => {
    const toggleTheme = () => setTheme(isDarkTheme ? "light" : "dark")

    return (
        <S.ButtonSecondary onClick={toggleTheme}>
            {isDarkTheme ? (
                <span aria-label='Light mode' role='img'>
							🌞
						</span>
            ) : (
                <span aria-label='Dark mode' role='img'>
							🌜
						</span>
            )}
        </S.ButtonSecondary>
    )
}

export default ChangeTheme