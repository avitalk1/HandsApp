import React, { Component } from 'react';
import FormInput from './FormInput';
import TextareaInput from './TextareaInput'
class Request extends React.Component {
    state = {
        user: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            location: "",
        },
        request: {
            description: "",
            images: [],
            date_from:"",
            date_to:""
        },
        num_of_images:4,
        errors: {},
        submitted: false
    };

    handleChangeUser = event => {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    };
    handleChangeRequest = event => {
        const { request } = this.state;
        request[event.target.name] = event.target.value;
        this.setState({ request });
    };
    handleChangeImage = event => {
        const { request } = this.state;
        request[event.target.name].push(event.target.value)
        this.setState({ request });
    }
    onSubmit = () => {
        const {
            user: { first_name, last_name, email, password, location, profession },
            request: { description, images , date_from, date_to}
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
        if (!description) {
            err.description = "Enter Description"
        }
        if (!date_from) {
            err.date_from = "Enter Starting date"
        }
        if (!date_to) {
            err.date_to = "Enter Ending Date"
        }
        if (images.length === 0) {
            err.images = "Upload Images"
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
            num_of_images,
            user: { first_name, last_name, email, password, location, profession },
            request: { description, images , date_from, date_to}
        } = this.state;
        return (
            <div>
                {submitted ? (
                    <p>Welcome onboard, {first_name}!</p>
                ) : (
                        <div>
                            <h3>Login!</h3>
                            <FormInput
                                label="First Name"
                                name="first_name"
                                type="text"
                                value={first_name}
                                onChange={this.handleChangeUser}
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
                                onChange={this.handleChangeUser}
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
                                onChange={this.handleChangeUser}
                                placeholder="Enter Email..."
                                error={errors.email}
                                required
                                className="input"
                            />

                            <FormInput
                                label="Phone Number"
                                name="password"
                                type="password"
                                value={password}
                                onChange={this.handleChangeUser}
                                placeholder="Enter Phone Number..."
                                error={errors.password}
                                className="input"
                                required
                            />
                            <FormInput
                                label="Location"
                                name="location"
                                type="text"
                                value={location}
                                onChange={this.handleChangeUser}
                                placeholder="Enter Location..."
                                error={errors.location}
                                className="input"
                                required
                            />
                            <TextareaInput
                                label="Description"
                                name="description"
                                value={description}
                                onChange={this.handleChangeRequest}
                                placeholder="Enter description..."
                                error={errors.description}
                                rows={3}
                                cols={10}
                                className="input"
                                required
                            />
                            <FormInput
                                   label="Starting Date"
                                   name="date_from"
                                   type="date"
                                   value={date_from}
                                   onChange={this.handleChangeRequest}
                                   error={errors.date_from}
                                   className="input"
                               />
                            <FormInput
                                   label="Ending Date"
                                   name="date_to"
                                   type="date"
                                   value={date_to}
                                   onChange={this.handleChangeRequest}
                                   error={errors.date_to}
                                   className="input"
                               />
                             {Array.from(Array(num_of_images)).map((x, index) =>   
                             <FormInput
                                key={index}
                                   label="Images"
                                   name="images"
                                   type="file"
                                   accept={"image/*"}
                                   value={images[index]}
                                   onChange={this.handleChangeImage}
                                   error={errors.images}
                                   className="input"
                               />)}
                               
                         
                            <button onClick={this.onSubmit}>Signup</button>
                        </div>
                    )}
            </div>
        );
    }
}

export default Request;
