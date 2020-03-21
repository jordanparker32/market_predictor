#Description: This program uses an artificial recurrent network called LSTM(Long Short Term Memory) to predict the closing price of a corporation
# (Apple inc.) using the past 60 day stock price

#Import libraries
import math
import pandas_datareader as web
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import LSTM, Dense
import matplotlib.pyplot as plt

plt.style.use('fivethirtyeight')

#Get the stock quote
df = web.DataReader('AAPL', data_source = 'yahoo', start = '2012-01-01', end = '2020-03-17')
# show data
print(df)
#Get the numbers  of rows and columns in the data set
print(df.shape)

#Visualize the closing price history
plt.figure(figsize=(16, 8))
plt.title('Close Price History')
plt.plot(df['Close'])
plt.xlabel('Date', fontsize=18)
plt.ylabel('Close Price USD ($)', fontsize=18)
#plt.show()

#Create a new dataset with only the Close column
data = df.filter(['Close'])
#Convert dataset into a numpy of arrays
dataset = data.values
# Get the number of rows to train the model on
training_data_len = math.ceil(len(dataset) * .8)
print('Length of training data set', training_data_len)

#Scale the data into 0 and 1
scaler = MinMaxScaler(feature_range=(0, 1))
scaled_data = scaler.fit_transform(dataset)
print("Scaled data: ", scaled_data)

#Create the training data set
#Create the scaled training data set
train_data = scaled_data[0:training_data_len , :]
#Split the data into x_train and y_train data sets. xtrain: feature, y_train:targets
x_train = []
y_train = []

for i in range(60, len(train_data)):
    x_train.append(train_data[i-60:i, 0]) #print from position i-60 not including i from 0-60 at postion 59
    y_train.append(train_data[i, 0]) # contains the 61st value which will be at position 60
    if i <= 60:
        print("x_train dataset: ", x_train)
        print("y_train dataset: ", y_train)
        print()

#Convert the x_train and y_train to numpy arrays
x_train, y_train = np.array(x_train), np.array(y_train)
#Reshape the data
x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))
x_train.shape
#Build the LSTM Model
model = Sequential()
model.add(LSTM(50, return_sequences=True, input_shape=(x_train.shape[1], 1)))
model.add(LSTM(50, return_sequences=False))
model.add(Dense(25))
model.add(Dense(1))

#Compile the model
model.compile(optimizer='adam', loss='mean_squared_error')
#Train the model
model.fit(x_train, y_train, batch_size=1, epochs=1)

#Create the testing dataset
#Create a new array containing scaled values from index 1560 to 2024
test_data = scaled_data[training_data_len-60: , :]
#Create the data sets x_test and y_test
x_test = []
y_test = dataset[training_data_len:, :]
for i in range(60, len(test_data)):
    x_test.append(test_data[i-60:i, 0])
#Convert the data into a numpy array
x_test = np.array(x_test)
#Reshape the data into a 3 dimensional model
x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))

#Get the models predicted price values
predictions = model.predict(x_test)
predictions = scaler.inverse_transform(predictions)
#Get the Root Mean Squared Error (RMSE) if RMSE is 0, it means that it is perfect
rmse = np.sqrt(np.mean(predictions - y_test) ** 2)
print(rmse)

#Plot the data
train = data[:training_data_len]
valid = data[training_data_len:]
valid['Predictions'] = predictions
#Visualize the data
plt.figure(figsize=(16, 8))
plt.title('Model')
plt.xlabel('Date', fontsize=18)
plt.ylabel('Close Price USD($)', fontsize=18)
plt.plot(train['Close'])
plt.plot(valid[['Close', 'Predictions']])
plt.legend(['Train', 'Actual Value', 'Predictions'], loc='lower right')
plt.show()

#Show the valid and actual price
print(valid)

#Get the quote-> Predict closing price of apple stock fpr dec 18 2019
apple_quote = web.DataReader('AAPL', data_source='yahoo', start='2012-01-01', end='2019-12-18')
#Create a new dataframe
new_df = apple_quote.filter(['Close'])
#Get the last 60 days closing price and convert the dataframe to an array
last_60_days = new_df[-60:].values
#Scale the data to be values between 0 and 1
last_60_days_scaled = scaler.transform(last_60_days)
#Create an empty list
X_test = []
#Append the last 60 days
X_test.append(last_60_days_scaled)
#Convert the X_test data set to numpy array
X_test = np.array(X_test)
#Reshape the data
X_test = np.reshape(X_test, (X_test.shape[0], X_test.shape[1], 1))
#Get the predicted scale price
pred_price = model.predict(X_test)
#Undo the scaling
pred_price = scaler.inverse_transform(pred_price)
print(pred_price)

#Get the Quote or close price for apple on 2019-12-18
apple_quote2 = web.DataReader('AAPL', data_source='yahoo', start='2019-12-18', end = '2019-12-18')
print('apple stock price2: ', apple_quote2['Close'])
