import React from 'react';

const InputField = ({ label, type, value, onChange, placeholder, icon: Icon, required }) => {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text font-medium">{label}</span>
            </label>
            <div className="join w-full">
                {Icon && (
                    <span className="join-item bg-base-200 px-3 flex items-center">
                        <Icon className="h-5 w-5" />
                    </span>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="join-item input input-bordered w-full"
                    required={required}
                />
            </div>
        </div>
    );
};

export default InputField; 