create table fundref(
userBank varchar(5),
accountNumber integer,
activeDate Date,
ValidtoDate Date,
fundName varchar(50),
multiManager boolean,
legalStructure varchar(10),
distributionDate varchar(5),
performanceFeeRate numeric,
ter numeric,
valuationPoint varchar(10),
internalSLA time,
externalSLA time
);


INSERT INTO fundref (userBank, accountNumber, activeDate, ValidtoDate, fundName, multiManager, legalStructure, distributionDate, performanceFeeRate, ter, valuationPoint, internalSLA, externalSLA) VALUES
('EM', 1710001, '2023-02-01', '2049-12-31', 'Global Equity Fund', TRUE, 'OEIQ', 'Q1', 1.2, 0.5, '17:00', '12:15', '14:30'),
('IR', 1710002, '2023-03-01', '2049-12-31', 'Fixed Income Fund', FALSE, 'UT', 'Q2', 1.0, 0.6, '16:45', '13:00', '15:45'),
('EM', 1710003, '2023-04-01', '2049-12-31', 'Sustainable Growth Fund', TRUE, 'ALTS', 'Q3', 1.5, 0.55, '16:30', '12:45', '16:15'),
('IR', 1710004, '2023-05-01', '2049-12-31', 'Tech Innovators Fund', FALSE, 'OEIQ', 'Q4', 1.8, 0.65, '17:15', '13:15', '14:45'),
('EM', 1710005, '2023-06-01', '2049-12-31', 'Emerging Markets Fund', TRUE, 'UT', 'Q1', 2.0, 0.7, '16:00', '12:30', '15:00'),
('IR', 1710006, '2023-07-01', '2049-12-31', 'High Yield Bond Fund', FALSE, 'ALTS', 'Q2', 1.1, 0.75, '17:00', '13:45', '16:45'),
('EM', 1710007, '2023-08-01', '2049-12-31', 'Real Estate Investment Fund', TRUE, 'OEIQ', 'Q3', 1.3, 0.8, '16:50', '12:00', '14:15'),
('IR', 1710008, '2023-09-01', '2049-12-31', 'Commodity Fund', FALSE, 'UT', 'Q4', 1.4, 0.85, '16:40', '13:30', '15:30'),
('EM', 1710009, '2023-10-01', '2049-12-31', 'Global Infrastructure Fund', TRUE, 'ALTS', 'Q1', 1.6, 0.9, '17:05', '12:20', '14:50'),
('IR', 1710010, '2023-11-01', '2049-12-31', 'Private Equity Fund', FALSE, 'OEIQ', 'Q2', 1.7, 0.95, '16:55', '13:10', '16:30');
