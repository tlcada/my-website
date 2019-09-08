import React, { Component } from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

import LinkId from '../Utils/LinkId';
import { callApi } from '../Service/Api';
import config from '../../config/Config';
import './Contact.css';

const formFieldsMaxLength = { name: 20, email: 65, title: 35, message: 800 };
const statusCode = { ok: 200, validatorFail: 411 };
const fieldValues = { value: '', fieldName: '' };

const FieldGroup = ({ ...props }) => {
    return (
        <FormGroup controlId={props.id}>
            <FormControl {...props} />
        </FormGroup>
    );
};

class Contact extends Component {
    constructor(props) {
        super(props);
        this.msg = this.props.msg;
        this.state = {
            formData: {
                name: fieldValues,
                email: fieldValues,
                title: fieldValues,
                message: fieldValues
            },
            response: '',
            disableButton: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        const formProperty = this.state.formData;
        formProperty[name] = { value: value, fieldName: name };

        this.setState({
            formData: formProperty
        });
    }

    handleSubmit(event) {
        this.setState({ disableButton: true });
        this.setState({ response: this.msg.sending });

        let maxLengthError = false;

        let key;
        for (key of Object.keys(this.state.formData)) {
            const state = this.state.formData[key];
            // Check that maxLength value has not manipulate
            if (state.value.length > formFieldsMaxLength[state.fieldName]) {
                maxLengthError = true;
                break;
            }
        }

        if (maxLengthError) {
            this.setState({ response: this.msg.maxLengthError });
        } else {
            callApi(config.api.url, this.state.formData).then((response) => {
                if (response.status === statusCode.ok) {
                    let key;
                    for (key of Object.keys(this.state.formData)) {
                        let state = this.state.formData[key];
                        state.value = '';
                    }
                    this.setState({ formData: this.state.formData });
                    this.setState({ response: this.msg.sendSuccess });
                } else if (response.status === statusCode.validatorFail) {
                    this.setState({ response: this.msg.maxLengthError });
                } else {
                    this.setState({ response: this.msg.sendFail });
                }
            }).catch(() => {
                this.setState({ response: this.msg.sendFail });
            }).then(() => {
                setTimeout(() => this.setState({ response: '' }), 6000);
                this.setState({ disableButton: false });
            });
        }

        event.preventDefault();
    }

    render() {
        return (
            <div id={ LinkId.contact } className="Contact">
                <div className="container">
                    <h3>{ this.msg.title }</h3>
                    <span className="Title-description">{ this.msg.titleDescription }</span>
                    <form onSubmit={ this.handleSubmit }>
                        <FieldGroup name="name" maxLength={ formFieldsMaxLength.name } value={ this.state.formData.name.value } type="text" placeholder={ this.msg.form.name + ' *' } required onChange={ this.handleChange } />
                        <FieldGroup name="email" maxLength={ formFieldsMaxLength.email } value={ this.state.formData.email.value } pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" type="text" placeholder={ this.msg.form.email + ' *' } required onChange={ this.handleChange } />
                        <FieldGroup name="title" maxLength={ formFieldsMaxLength.title } value={ this.state.formData.title.value } type="text" placeholder={ this.msg.form.title + ' *' } required onChange={ this.handleChange } />
                        <FieldGroup name="message" maxLength={ formFieldsMaxLength.message } value={ this.state.formData.message.value } rows="7" componentClass="textarea" placeholder={ this.msg.form.message + ' *' } required onChange={ this.handleChange } />
                        <p className="Result-message">{ this.state.disableButton === true ? <Glyphicon glyph='refresh' /> : '' }  { this.state.response }</p>
                        <Button disabled={ this.state.disableButton } type="submit">{ this.msg.sendButton }</Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Contact;
