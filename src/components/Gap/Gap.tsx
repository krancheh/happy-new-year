interface IProps {
    size?: 'small' | 'medium' | 'large';
}

export const Gap = ({size = 'medium'}: IProps) => {
    const gapSizes = {
        small: 8,
        medium: 16,
        large: 24,
    };

    return <div style={{height: `${gapSizes[size]}px`}}></div>;
};
