interface Props {
    children: React.ReactNode;
    type?: 'submit' | 'button' | 'reset';
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    className?: string;
}

export default function DialogButton(props: Props) {
    const { type = 'button', children, onClick, className = '' } = props;
    return (
        <button
            className={`bg-primary-400 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
