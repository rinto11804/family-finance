function Button({
    children,
    type = 'button',
    variant = 'primary',
    className = '',
    ...props
}) {
    const baseClasses = 'btn'
    const variantClasses = {
        primary: 'btn-primary text-primary-content',
        secondary: 'btn-secondary text-secondary-content',
        accent: 'btn-accent text-accent-content',
        ghost: 'btn-ghost',
    }

    const classes = `
        ${baseClasses} 
        ${variantClasses[variant]} 
        transition-all duration-200
        ${className}
    `

    return (
        <button type={type} className={classes} {...props}>
            {children}
        </button>
    )
}

export default Button 