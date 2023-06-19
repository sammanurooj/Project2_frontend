import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import FormUI from '../../components/summarizedBOT/index';

const Chatbot = () => {
  const [formValues, setFormValues] = useState({
    userText: '',
  });

  const [messages, setMessages] = useState([]);

  const addTextMutation = useMutation(async ({ userText, userID }) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post('http://localhost:5000/api/text/addtext', { userText, userID }, config);
    console.log('this is data', response.data);
    console.log('summary', response.data.data.SummarizeText);
    return response.data.data;
  });

  const getDataFromSummaryTable = async (userID) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`http://localhost:5000/api/text/${userID}`, config);
    console.log('getDataFromSummaryTable response:', response.data);

    const messagesData = response.data.data.map((item) => ({
      summarizedText: item.SummerizeText,
      userText: item.userText,
    }));

    console.log("messages from user", messagesData);

    setMessages(messagesData);
  };

  useEffect(() => {
    if (addTextMutation.isSuccess && addTextMutation.data) {
      const { userText, summarizedText } = addTextMutation.data;

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          summarizedText,
          userText,
        },
      ]);

      setFormValues({
        userText: '',
      });
    }
  }, [addTextMutation.isSuccess, addTextMutation.data]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formValues.userText.trim() === '') {
      return alert('Please enter some text');
    }

    const userID = localStorage.getItem('userid');

    addTextMutation.mutate({
      userText: formValues.userText,
      userID: userID,
    });

    if (addTextMutation.isLoading) {
      return alert('Adding...');
    }

    if (addTextMutation.isError) {
      return alert('Some network error');
    }

    if (addTextMutation.isSuccess) {
      alert('Successfully added');

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

  useEffect(() => {
    const userID = localStorage.getItem('userid');

    if (userID) {
      getDataFromSummaryTable(userID);
    }
  }, [addTextMutation.isSuccess, addTextMutation.data]);

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
