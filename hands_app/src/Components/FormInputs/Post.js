import React, { Component } from 'react';
import FormInput from './FormInput';
import TextareaInput from './TextareaInput'
class Post extends React.Component {
    state = {
        post: {
           subject:"",
           description:"",
           date:"",
           num_of_volunteers:0,
           profession_needed:[]
        },
        errors: {},
        submitted: false
    };

    handleChange = event => {
        const { post } = this.state;
        post[event.target.name] = event.target.value;
        this.setState({ post });
    };
    onSubmit = () => {
        const {
            post:{subject, description, date, num_of_volunteers, profession_needed}
        } = this.state;
        let err = {};
        if(!subject) {
            err.subject = "Enter Subject";
        }
        if(!description) {
            err.description = "Enter Description";
        }
        if(!date) {
            err.date = "Enter Date";
        }
        
        if(num_of_volunteers===0) {
            err.date = "Enter Number of Volunteers Needed ";
        }
        if(profession_needed.length ===0){
            err.profession_needed = "Enter Professions needed"
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
            post:{subject, description, date, num_of_volunteers, profession_needed}
        } = this.state;
        return (
            <div>
                {submitted ? (
                    <p>Welcome onboard!</p>
                ) : (
                        <div>
                            <h3>Login!</h3>
                            <FormInput
                                name="subject"
                                type="text"
                                value={subject}
                                onChange={this.handleChange}
                                placeholder="Subject"
                                error={errors.subject}
                                className="input"
                            />
                            <TextareaInput
                                label="Description"
                                name="description"
                                value={description}
                                onChange={this.handleChange}
                                placeholder="Enter description..."
                                error={errors.description}
                                rows={3}
                                cols={10}
                                className="input"
                                required
                            />
                             <FormInput
                                   label="Date"
                                   name="date"
                                   type="date"
                                   value={date}
                                   onChange={this.handleChange}
                                   error={errors.date}
                                   className="input"
                               />
                         
                            <button onClick={this.onSubmit}>POST</button>
                        </div>
                    )}
            </div>
        );
    }
}

export default Post;
