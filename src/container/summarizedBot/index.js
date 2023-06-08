import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import FormUI from '../../components/summarizedBOT/index';

const Chatbot = () => {
    const [formValues, setFormValues] = useState({
        userText: '',
    });

    const [messages, setMessages] = useState([]);

    const addtextmutation = useMutation(async ({ userText }) => {
        const response = await axios.post('http://localhost:5000/api/text/addtext', { userText });
        console.log('this is data', response.data);
        console.log('summary', response.data.data.SummerizeText);
        return response.data.data;
    });

    useEffect(() => {
    if (addtextmutation.isSuccess) {
        const { userText, SummerizeText } = addtextmutation.data;

        setMessages((prevMessages) => [
            ...prevMessages,
            {
                summarizedText: SummerizeText,
                userText: userText
            },
        ]);

        // Reset form fields
        setFormValues({
            userText: '',
        });
    }
}, [addtextmutation.isSuccess, addtextmutation.data]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formValues.userText.trim() === '') {
            return alert('Please enter some text');
        }

        addtextmutation.mutate({
            userText: formValues.userText,
        });

        if (addtextmutation.isLoading) {
            return alert('Adding...');
        }

        if (addtextmutation.isError) {
            return alert('Some network error');
        }

        if (addtextmutation.isSuccess) {
            // Show success popup
            alert('Successfully added');

            // Reset form fields
            setFormValues({
                userText: '',
            });
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (
        <FormUI
            formValues={formValues}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            messages={messages}
        />
    );
};

export default Chatbot;
