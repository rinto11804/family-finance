function Input({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    required = false,
    error
}) {
    return (
        <div className="form-control w-full">
            {label && (
                <label className="label pb-1">
                    <span className="label-text font-medium text-base">{label}</span>
                </label>
            )}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`
                    input input-bordered w-full bg-base-100
                    h-11 px-4 
                    focus:outline-none focus:ring-2 focus:ring-primary/20
                    transition-all duration-200
                    ${error ? 'input-error' : ''}
                `}
            />
            {error && (
                <label className="label pt-1">
                    <span className="label-text-alt text-error text-sm">{error}</span>
                </label>
            )}
        </div>
    )
}

export default Input 