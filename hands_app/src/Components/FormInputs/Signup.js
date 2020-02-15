import React, { Component } from 'react';
import FormInput from './FormInput';

class Signup extends React.Component {
    state = {
        user: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            location: "",
            profession: ""

        },
        errors: {},
        submitted: false
    };

    handleChange = event => {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    };

    onSubmit = () => {
        const {
            user: { first_name, last_name, email, password, location, profession }
        } = this.state;
        let err = {};
        if (!first_name) {
            err.first_name = "Enter First Name"
        }
        if (!last_name) {
            err.last_name = "Enter Last Name"
        }
        if (!email) {
            err.email = "Enter your Email!";
        }

        if (password.length < 8) {
            err.password = "Password must be at least 8 characters!";
        }
        if (!location) {
            err.location = "Enter Location"
        }
        if (!profession) {
            err.profession = "Enter Profession"
        }

        this.setState({ errors: err }, () => {
            if (Object.getOwnPropertyNames(this.state.errors).length === 0) {
                this.setState({ submitted: true });
            }
        });
    };

    render() {
        const {
            submitted,
            errors,
            user: { first_name, last_name, email, password, location, profession }
        } = this.state;
        return (
            <div>
                {submitted ? (
                    <p>Welcome onboard, {first_name}!</p>
                ) : (
                        <div>
                            <h3>Signup!</h3>
                            <FormInput
                                label="First Name"
                                name="first_name"
                                type="text"
                                value={first_name}
                                onChange={this.handleChange}
                                placeholder="Enter First Name..."
                                error={errors.first_name}
                                required
                                className="input"
                            />
                            <FormInput
                                label="Last Name"
                                name="last_name"
                                type="text"
                                value={last_name}
                                onChange={this.handleChange}
                                placeholder="Enter Last Name..."
                                error={errors.last_name}
                                required
                                className="input"
                            />
                            <FormInput
                                label="Email"
                                name="email"
                                type="text"
                                value={email}
                                onChange={this.handleChange}
                                placeholder="Enter Email..."
                                error={errors.email}
                                required
                                className="input"
                            />

                            <FormInput
                                label="Password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={this.handleChange}
                                placeholder="Enter password..."
                                error={errors.password}
                                className="input"
                                required
                            />
                            <FormInput
                                label="Location"
                                name="location"
                                type="text"
                                value={location}
                                onChange={this.handleChange}
                                placeholder="Enter Location..."
                                error={errors.location}
                                className="input"
                                required
                            />
                            <FormInput
                                label="Profession"
                                name="profession"
                                type="text"
                                value={profession}
                                onChange={this.handleChange}
                                placeholder="Enter Profession..."
                                error={errors.profession}
                                className="input"
                                required
                            />
                            <button onClick={this.onSubmit}>Signup</button>
                        </div>
                    )}
            </div>
        );
    }
}

export default Signup;
