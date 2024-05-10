ALTER TABLE eventticketpurchase
ADD CONSTRAINT fk_userID
FOREIGN KEY (userID) REFERENCES user(userID);

ALTER TABLE museumticketpurchase
ADD CONSTRAINT fk_user_userID
FOREIGN KEY (userID) REFERENCES user(userID);
