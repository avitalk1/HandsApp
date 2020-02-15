import React , {Component}  from 'react';
import FormInput from './FormInput';

class Form extends React.Component {
     state = {
       user: {
         email: "",
         password: ""
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
         user: { email, password }
       } = this.state;
       let err = {};
   
       if (!email) {
         err.email = "Enter your Email!";
       }
   
       if (password.length < 8) {
         err.password = "Password must be at least 8 characters!";
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
         user: { email, password }
       } = this.state;
       return (
         <div>
           {submitted ? (
             <p>Welcome back, {email}!</p>
           ) : (
             <div>
               <h3>Login!</h3>
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
   
              <button onClick={this.onSubmit}>Submit</button>
             </div>
           )}
         </div>
       );
     }
   }

export default Form;
