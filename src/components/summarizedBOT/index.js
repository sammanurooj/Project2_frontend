import React from 'react';
import { Box, Typography, TextField, Button, Autocomplete, IconButton, Card, CardContent } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';

const Container = styled(Box)({
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  minHeight: '90vh',
});

const Chatbox = styled(Box)({
  backgroundColor: '#f5f5f5',
  padding: '10px',
  overflowY: 'auto',
  flex: '1',
});

const CardWrapper = styled(Box)({
  marginBottom: '10px',
});

const UserTextCard = styled(Card)({
  marginBottom: '10px',
  backgroundColor: '#92cbdf',
});

const SummarizedTextCard = styled(Card)({
  marginBottom: '10px',
  backgroundColor: '#6bcf98',
});

const FormUI = ({ formValues, handleSubmit, handleInputChange, messages }) => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        SummarizedBot
      </Typography>
      <Chatbox>
        {messages.map((message, index) => (
          <CardWrapper key={index}>
            <UserTextCard variant="outlined">
              <CardContent wordBreak="break-word">
                <Typography variant="body1" gutterBottom>
                   {message.userText}
                </Typography>
              </CardContent>
            </UserTextCard>
            <SummarizedTextCard variant="outlined">
              <CardContent wordBreak="break-word">
                <Typography variant="body2" gutterBottom>
                {message.summarizedText}
                </Typography>
              </CardContent>
            </SummarizedTextCard>
          </CardWrapper>
        ))}
      </Chatbox>
      <Box alignItems="center" mt={5} mb={2}>
        <Autocomplete
          freeSolo
          options={[]}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Type your message..."
              name="userText"
              value={formValues.userText}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              multiline
              minRows={1}
              maxRows={5}
              InputProps={{
                endAdornment: (
                  <IconButton color="primary" onClick={handleSubmit}>
                    <SendIcon />
                  </IconButton>
                ),
              }}
            />
          )}
        />
      </Box>
    </Container>
  );
};

export default FormUI;
