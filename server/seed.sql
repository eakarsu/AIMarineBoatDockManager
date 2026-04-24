-- Seed data for AI Marina & Boat Dock Manager
-- NOTE: Users table is seeded separately via seed.js with bcrypt hashing

-- ========================================
-- SLIPS (30 slips across docks A, B, C)
-- ========================================
INSERT INTO slips (slip_number, dock, length_ft, width_ft, depth_ft, slip_type, has_electric, has_water, electric_amp, status, monthly_rate, daily_rate, location_x, location_y, notes) VALUES
('A-1', 'A', 30.0, 12.0, 6.0, 'wet', true, true, 30, 'occupied', 850.00, 45.00, 10.00, 10.00, 'End slip with easy access'),
('A-2', 'A', 30.0, 12.0, 6.0, 'wet', true, true, 30, 'occupied', 800.00, 42.00, 10.00, 22.00, NULL),
('A-3', 'A', 35.0, 14.0, 7.0, 'wet', true, true, 50, 'occupied', 1050.00, 55.00, 10.00, 36.00, 'Upgraded electric panel'),
('A-4', 'A', 35.0, 14.0, 7.0, 'wet', true, true, 50, 'occupied', 1050.00, 55.00, 10.00, 50.00, NULL),
('A-5', 'A', 40.0, 16.0, 8.0, 'wet', true, true, 50, 'occupied', 1400.00, 70.00, 10.00, 66.00, 'Premium corner slip'),
('A-6', 'A', 30.0, 12.0, 6.0, 'wet', true, true, 30, 'available', 800.00, 42.00, 10.00, 78.00, NULL),
('A-7', 'A', 30.0, 12.0, 6.0, 'wet', true, true, 30, 'maintenance', 800.00, 42.00, 10.00, 90.00, 'Dock boards need replacement'),
('A-8', 'A', 45.0, 16.0, 8.0, 'wet', true, true, 100, 'occupied', 1800.00, 90.00, 10.00, 106.00, 'Mega yacht slip with shore power'),
('A-9', 'A', 25.0, 10.0, 5.0, 'wet', true, true, 30, 'occupied', 650.00, 35.00, 10.00, 118.00, NULL),
('A-10', 'A', 25.0, 10.0, 5.0, 'wet', true, true, 30, 'available', 650.00, 35.00, 10.00, 128.00, NULL),
('B-1', 'B', 35.0, 14.0, 7.0, 'wet', true, true, 50, 'occupied', 1100.00, 58.00, 50.00, 10.00, NULL),
('B-2', 'B', 35.0, 14.0, 7.0, 'wet', true, true, 50, 'occupied', 1100.00, 58.00, 50.00, 24.00, NULL),
('B-3', 'B', 40.0, 16.0, 8.0, 'wet', true, true, 50, 'occupied', 1350.00, 68.00, 50.00, 40.00, 'Near fuel dock'),
('B-4', 'B', 40.0, 16.0, 8.0, 'wet', true, true, 100, 'occupied', 1500.00, 75.00, 50.00, 56.00, 'Double electric hookup'),
('B-5', 'B', 50.0, 18.0, 9.0, 'wet', true, true, 100, 'occupied', 2200.00, 110.00, 50.00, 74.00, 'Premium end-tie'),
('B-6', 'B', 30.0, 12.0, 6.0, 'wet', true, true, 30, 'available', 850.00, 45.00, 50.00, 86.00, NULL),
('B-7', 'B', 30.0, 12.0, 6.0, 'wet', true, true, 30, 'occupied', 850.00, 45.00, 50.00, 98.00, NULL),
('B-8', 'B', 45.0, 16.0, 8.5, 'wet', true, true, 100, 'available', 1750.00, 88.00, 50.00, 114.00, NULL),
('C-1', 'C', 20.0, 8.0, 4.0, 'wet', true, true, 30, 'occupied', 450.00, 25.00, 90.00, 10.00, 'Small boat area'),
('C-2', 'C', 20.0, 8.0, 4.0, 'wet', true, true, 30, 'occupied', 450.00, 25.00, 90.00, 18.00, NULL),
('C-3', 'C', 22.0, 9.0, 4.5, 'wet', true, true, 30, 'available', 500.00, 28.00, 90.00, 27.00, NULL),
('C-4', 'C', 22.0, 9.0, 4.5, 'wet', true, true, 30, 'occupied', 500.00, 28.00, 90.00, 36.00, NULL),
('C-5', 'C', 25.0, 10.0, 5.0, 'wet', true, true, 30, 'occupied', 600.00, 32.00, 90.00, 46.00, NULL),
('C-6', 'C', 25.0, 10.0, 5.0, 'wet', true, true, 30, 'occupied', 600.00, 32.00, 90.00, 56.00, NULL),
('C-7', 'C', 28.0, 10.0, 5.5, 'wet', true, true, 30, 'available', 700.00, 38.00, 90.00, 66.00, NULL),
('C-8', 'C', 28.0, 10.0, 5.5, 'wet', true, true, 30, 'occupied', 700.00, 38.00, 90.00, 76.00, NULL),
('C-9', 'C', 20.0, 8.0, 4.0, 'wet', true, false, 30, 'maintenance', 400.00, 22.00, 90.00, 84.00, 'Water line repair needed'),
('C-10', 'C', 20.0, 8.0, 4.0, 'wet', false, false, 0, 'available', 350.00, 20.00, 90.00, 92.00, 'No utilities - mooring only'),
('D-1', 'D', 60.0, 20.0, 10.0, 'wet', true, true, 100, 'occupied', 3200.00, 160.00, 130.00, 10.00, 'Yacht basin slip 1'),
('D-2', 'D', 60.0, 20.0, 10.0, 'wet', true, true, 100, 'available', 3200.00, 160.00, 130.00, 30.00, 'Yacht basin slip 2');

-- ========================================
-- TENANTS (18 tenants)
-- ========================================
INSERT INTO tenants (first_name, last_name, email, phone, address, emergency_contact, emergency_phone, slip_id, lease_start, lease_end, lease_type, monthly_rate, deposit_amount, insurance_policy, insurance_expiry, status, notes) VALUES
('Robert', 'Harrison', 'robert.harrison@email.com', '(954) 555-0101', '1234 Ocean Blvd, Fort Lauderdale, FL 33301', 'Mary Harrison', '(954) 555-0102', 1, '2025-01-01', '2025-12-31', 'annual', 850.00, 1700.00, 'POL-2025-0001', '2025-12-31', 'active', 'Long-time tenant since 2018'),
('James', 'Mitchell', 'james.mitchell@email.com', '(954) 555-0103', '567 Harbor Dr, Fort Lauderdale, FL 33302', 'Susan Mitchell', '(954) 555-0104', 2, '2025-03-01', '2026-02-28', 'annual', 800.00, 1600.00, 'POL-2025-0002', '2026-02-28', 'active', NULL),
('Patricia', 'Chen', 'patricia.chen@email.com', '(305) 555-0201', '890 Bayview Ave, Miami, FL 33131', 'David Chen', '(305) 555-0202', 3, '2025-01-01', '2025-12-31', 'annual', 1050.00, 2100.00, 'POL-2025-0003', '2025-12-31', 'active', 'Prefers email communication'),
('William', 'O''Brien', 'wobrien@email.com', '(954) 555-0301', '2345 Marina Way, Dania Beach, FL 33004', 'Kate O''Brien', '(954) 555-0302', 4, '2025-04-01', '2026-03-31', 'annual', 1050.00, 2100.00, 'POL-2025-0004', '2026-03-31', 'active', NULL),
('Catherine', 'Russo', 'crusso@email.com', '(561) 555-0401', '678 Palm Beach Rd, Boca Raton, FL 33432', 'Anthony Russo', '(561) 555-0402', 5, '2025-01-01', '2025-12-31', 'annual', 1400.00, 2800.00, 'POL-2025-0005', '2025-12-31', 'active', 'Premium slip tenant'),
('Thomas', 'Walker', 'twalker@email.com', '(954) 555-0501', '910 Sunrise Blvd, Fort Lauderdale, FL 33304', 'Linda Walker', '(954) 555-0502', 8, '2025-02-01', '2026-01-31', 'annual', 1800.00, 3600.00, 'POL-2025-0006', '2026-01-31', 'active', 'Yacht owner - requires 100amp'),
('Maria', 'Santos', 'msantos@email.com', '(305) 555-0601', '1122 Biscayne Bay Dr, Miami, FL 33132', 'Carlos Santos', '(305) 555-0602', 9, '2025-06-01', '2025-11-30', 'seasonal', 650.00, 650.00, 'POL-2025-0007', '2025-11-30', 'active', 'Seasonal - summer only'),
('Richard', 'Thompson', 'rthompson@email.com', '(954) 555-0701', '3344 Las Olas Blvd, Fort Lauderdale, FL 33301', 'Janet Thompson', '(954) 555-0702', 11, '2025-01-01', '2025-12-31', 'annual', 1100.00, 2200.00, 'POL-2025-0008', '2025-12-31', 'active', NULL),
('Elizabeth', 'Kim', 'ekim@email.com', '(954) 555-0801', '5566 SE 17th St, Fort Lauderdale, FL 33316', 'Daniel Kim', '(954) 555-0802', 12, '2025-03-01', '2026-02-28', 'annual', 1100.00, 2200.00, 'POL-2025-0009', '2026-02-28', 'active', NULL),
('Michael', 'Gonzalez', 'mgonzalez@email.com', '(305) 555-0901', '7788 Collins Ave, Miami Beach, FL 33141', 'Rosa Gonzalez', '(305) 555-0902', 13, '2025-01-01', '2025-12-31', 'annual', 1350.00, 2700.00, 'POL-2025-0010', '2025-12-31', 'active', 'Avid fisherman'),
('Sarah', 'Anderson', 'sanderson@email.com', '(561) 555-1001', '99 Royal Palm Way, Palm Beach, FL 33480', 'John Anderson', '(561) 555-1002', 14, '2025-01-01', '2025-12-31', 'annual', 1500.00, 3000.00, 'POL-2025-0011', '2025-12-31', 'active', NULL),
('David', 'Martinez', 'dmartinez@email.com', '(954) 555-1101', '456 A1A, Pompano Beach, FL 33062', 'Angela Martinez', '(954) 555-1102', 15, '2025-02-01', '2026-01-31', 'annual', 2200.00, 4400.00, 'POL-2025-0012', '2026-01-31', 'active', 'Largest vessel in marina'),
('Jennifer', 'Lee', 'jlee@email.com', '(305) 555-1201', '321 Coral Way, Miami, FL 33145', 'Kevin Lee', '(305) 555-1202', 17, '2025-05-01', '2025-10-31', 'seasonal', 850.00, 850.00, 'POL-2025-0013', '2025-10-31', 'active', 'Seasonal tenant'),
('Christopher', 'Brown', 'cbrown@email.com', '(954) 555-1301', '654 Flamingo Rd, Davie, FL 33325', 'Amanda Brown', '(954) 555-1302', 19, '2025-01-01', '2025-12-31', 'annual', 450.00, 900.00, 'POL-2025-0014', '2025-12-31', 'active', NULL),
('Nancy', 'Wilson', 'nwilson@email.com', '(954) 555-1401', '789 Federal Hwy, Fort Lauderdale, FL 33308', 'George Wilson', '(954) 555-1402', 20, '2025-01-01', '2025-12-31', 'annual', 450.00, 900.00, 'POL-2025-0015', '2025-12-31', 'active', NULL),
('Daniel', 'Taylor', 'dtaylor@email.com', '(561) 555-1501', '1010 Glades Rd, Boca Raton, FL 33431', 'Michelle Taylor', '(561) 555-1502', 22, '2025-04-01', '2026-03-31', 'annual', 500.00, 1000.00, 'POL-2025-0016', '2026-03-31', 'active', NULL),
('Barbara', 'White', 'bwhite@email.com', '(305) 555-1601', '555 Brickell Ave, Miami, FL 33131', 'Steven White', '(305) 555-1602', 23, '2025-01-01', '2025-12-31', 'annual', 600.00, 1200.00, 'POL-2025-0017', '2025-12-31', 'active', 'Also uses dry storage'),
('Mark', 'Davis', 'mdavis@email.com', '(954) 555-1701', '2020 Griffin Rd, Fort Lauderdale, FL 33312', 'Laura Davis', '(954) 555-1702', 29, '2025-01-01', '2025-12-31', 'annual', 3200.00, 6400.00, 'POL-2025-0018', '2025-12-31', 'active', 'Yacht basin premium tenant');

-- ========================================
-- BOATS (18 boats)
-- ========================================
INSERT INTO boats (name, registration_number, hull_id, boat_type, manufacturer, model, year, length_ft, beam_ft, draft_ft, weight_lbs, engine_type, engine_count, fuel_type, color, tenant_id, slip_id, insurance_company, insurance_policy, insurance_expiry, status, notes) VALUES
('Sea Breeze', 'FL-8823-MK', 'BWC62847K920', 'Center Console', 'Boston Whaler', '280 Outrage', 2022, 28.0, 9.5, 1.8, 7200.0, 'Outboard', 2, 'Gas', 'White/Blue', 1, 1, 'Marine Insurance Co', 'MIC-2025-001', '2025-12-31', 'active', 'Well maintained'),
('Lucky Strike', 'FL-9012-AB', 'GWY51234L821', 'Center Console', 'Grady-White', 'Canyon 271', 2021, 27.0, 9.5, 1.6, 6800.0, 'Outboard', 2, 'Gas', 'White', 2, 2, 'BoatUS Insurance', 'BUS-2025-002', '2026-02-28', 'active', NULL),
('Reel Therapy', 'FL-7755-CD', 'SER42589M922', 'Express Cruiser', 'Sea Ray', 'Sundancer 320', 2022, 33.0, 10.5, 3.3, 12500.0, 'Sterndrive', 2, 'Gas', 'White/Tan', 3, 3, 'Progressive Marine', 'PM-2025-003', '2025-12-31', 'active', NULL),
('Wind Dancer', 'FL-3344-EF', 'BEN73829N019', 'Sailboat', 'Beneteau', 'Oceanis 34.1', 2019, 34.0, 11.4, 6.2, 11200.0, 'Inboard', 1, 'Diesel', 'White', 4, 4, 'Geico Marine', 'GM-2025-004', '2026-03-31', 'active', 'Sailboat - deep draft'),
('Ocean King', 'FL-5566-GH', 'VIK85920P120', 'Sportfish', 'Viking', '38 Billfish', 2020, 38.0, 14.8, 3.8, 28000.0, 'Inboard', 2, 'Diesel', 'White/Navy', 5, 5, 'United Marine Insurance', 'UMI-2025-005', '2025-12-31', 'active', 'Tournament fishing vessel'),
('Grand Escape', 'FL-2211-JK', 'AZI94721Q221', 'Motor Yacht', 'Azimut', '43 Atlantis', 2021, 43.0, 13.5, 3.9, 32000.0, 'Inboard', 2, 'Diesel', 'White/Gray', 6, 8, 'Chubb Marine', 'CM-2025-006', '2026-01-31', 'active', 'Luxury yacht'),
('Island Hopper', 'FL-4433-LM', 'KEW31829R518', 'Cuddy Cabin', 'Key West', '239 FS', 2018, 24.0, 8.5, 1.4, 4900.0, 'Outboard', 1, 'Gas', 'Blue/White', 7, 9, 'AllState Boaters', 'ASB-2025-007', '2025-11-30', 'active', NULL),
('Blue Horizon', 'FL-6677-NP', 'BOS62938S720', 'Walkaround', 'Boston Whaler', '345 Conquest', 2020, 34.5, 11.3, 2.5, 14800.0, 'Outboard', 3, 'Gas', 'White', 8, 11, 'Marine Insurance Co', 'MIC-2025-008', '2025-12-31', 'active', 'Triple outboard setup'),
('Nauti Girl', 'FL-8899-QR', 'REG52910T621', 'Bowrider', 'Regal', '33 Express', 2021, 33.0, 10.0, 3.1, 13200.0, 'Sterndrive', 2, 'Gas', 'Red/White', 9, 12, 'Progressive Marine', 'PM-2025-009', '2026-02-28', 'active', NULL),
('Fish Tales', 'FL-1122-ST', 'YAM41523U822', 'Center Console', 'Yellowfin', '39 Offshore', 2022, 39.0, 11.5, 2.1, 12000.0, 'Outboard', 3, 'Gas', 'White/Yellow', 10, 13, 'BoatUS Insurance', 'BUS-2025-010', '2025-12-31', 'active', 'High performance fishing'),
('Lady Grace', 'FL-3344-UV', 'PRE83625V921', 'Motor Yacht', 'Prestige', '420 Flybridge', 2021, 42.0, 13.9, 3.7, 26000.0, 'Inboard', 2, 'Diesel', 'White/Blue', 11, 14, 'Chubb Marine', 'CM-2025-011', '2025-12-31', 'active', 'Flybridge yacht'),
('Endless Summer', 'FL-5566-WX', 'HAT72519W020', 'Sportfish', 'Hatteras', 'GT54', 2020, 50.0, 17.0, 4.5, 56000.0, 'Inboard', 2, 'Diesel', 'White', 12, 15, 'United Marine Insurance', 'UMI-2025-012', '2026-01-31', 'active', 'Largest sportfish in marina'),
('Bay Runner', 'FL-7788-YZ', 'BAY20918X819', 'Bay Boat', 'Bayliner', 'Trophy T22CX', 2019, 22.0, 8.0, 1.2, 3200.0, 'Outboard', 1, 'Gas', 'White/Green', 13, 17, 'Geico Marine', 'GM-2025-013', '2025-10-31', 'active', NULL),
('Sea Scout', 'FL-9900-AB', 'SCO10726Y720', 'Skiff', 'Scout', '195 Sportfish', 2020, 19.5, 7.8, 1.0, 2400.0, 'Outboard', 1, 'Gas', 'White', 14, 19, 'AllState Boaters', 'ASB-2025-014', '2025-12-31', 'active', 'Great for inshore fishing'),
('Tiki Time', 'FL-2233-CD', 'MAK30522Z618', 'Deck Boat', 'Mako', '204 CC', 2018, 20.0, 8.2, 1.1, 2800.0, 'Outboard', 1, 'Gas', 'White/Teal', 15, 20, 'Marine Insurance Co', 'MIC-2025-015', '2025-12-31', 'active', NULL),
('Compass Rose', 'FL-4455-EF', 'JNO41829A921', 'Sailboat', 'Jeanneau', 'Sun Odyssey 319', 2021, 22.0, 8.5, 5.0, 6800.0, 'Inboard', 1, 'Diesel', 'White', 16, 22, 'BoatUS Insurance', 'BUS-2025-016', '2026-03-31', 'active', 'Day sailer'),
('Wave Rider', 'FL-6677-GH', 'ROB52017B820', 'Center Console', 'Robalo', 'R242', 2020, 24.0, 8.5, 1.5, 5100.0, 'Outboard', 1, 'Gas', 'White/Blue', 17, 23, 'Progressive Marine', 'PM-2025-017', '2025-12-31', 'active', NULL),
('Majestic', 'FL-8899-JK', 'PRI92341C022', 'Motor Yacht', 'Princess', 'F55', 2022, 58.0, 15.5, 4.8, 62000.0, 'Inboard', 2, 'Diesel', 'White/Navy', 18, 29, 'Chubb Marine', 'CM-2025-018', '2025-12-31', 'active', 'Flagship vessel of the marina');

-- ========================================
-- UTILITY READINGS (18 readings)
-- ========================================
INSERT INTO utility_readings (slip_id, reading_date, electric_kwh, water_gallons, electric_cost, water_cost, notes) VALUES
(1, '2025-09-01', 245.50, 1200.00, 34.37, 9.60, NULL),
(1, '2025-10-01', 312.00, 1450.00, 43.68, 11.60, 'Higher usage - A/C season'),
(2, '2025-09-01', 198.00, 980.00, 27.72, 7.84, NULL),
(2, '2025-10-01', 225.30, 1100.00, 31.54, 8.80, NULL),
(3, '2025-09-01', 456.80, 2100.00, 63.95, 16.80, 'Live-aboard tenant'),
(3, '2025-10-01', 502.10, 2350.00, 70.29, 18.80, NULL),
(5, '2025-09-01', 389.00, 1800.00, 54.46, 14.40, NULL),
(5, '2025-10-01', 412.50, 1950.00, 57.75, 15.60, NULL),
(8, '2025-09-01', 780.00, 3200.00, 109.20, 25.60, 'Yacht with high electric draw'),
(8, '2025-10-01', 825.60, 3500.00, 115.58, 28.00, NULL),
(11, '2025-09-01', 356.00, 1650.00, 49.84, 13.20, NULL),
(11, '2025-10-01', 378.20, 1720.00, 52.95, 13.76, NULL),
(13, '2025-09-01', 298.00, 1400.00, 41.72, 11.20, NULL),
(14, '2025-09-01', 510.50, 2400.00, 71.47, 19.20, NULL),
(15, '2025-09-01', 920.00, 4100.00, 128.80, 32.80, 'Large sportfish - heavy usage'),
(15, '2025-10-01', 885.30, 3900.00, 123.94, 31.20, NULL),
(19, '2025-09-01', 85.00, 400.00, 11.90, 3.20, 'Small boat minimal usage'),
(29, '2025-09-01', 1050.00, 4800.00, 147.00, 38.40, 'Yacht basin - premium metering');

-- ========================================
-- FUEL SALES (20 sales)
-- ========================================
INSERT INTO fuel_sales (boat_id, boat_name, fuel_type, gallons, price_per_gallon, total_amount, pump_number, attendant, sale_date, payment_method, notes) VALUES
(1, 'Sea Breeze', 'Gas', 85.50, 4.899, 418.89, 1, 'Mike Torres', '2025-10-15 09:30:00', 'Credit Card', NULL),
(2, 'Lucky Strike', 'Gas', 72.30, 4.899, 354.20, 1, 'Mike Torres', '2025-10-15 10:15:00', 'Credit Card', NULL),
(5, 'Ocean King', 'Diesel', 250.00, 5.299, 1324.75, 2, 'Jake Rivera', '2025-10-15 11:00:00', 'Account', 'Tournament prep fill-up'),
(8, 'Blue Horizon', 'Gas', 190.00, 4.899, 930.81, 1, 'Mike Torres', '2025-10-16 08:45:00', 'Credit Card', 'Triple outboard fill'),
(10, 'Fish Tales', 'Gas', 210.00, 4.899, 1028.79, 1, 'Jake Rivera', '2025-10-16 09:30:00', 'Account', NULL),
(6, 'Grand Escape', 'Diesel', 380.00, 5.299, 2013.62, 2, 'Jake Rivera', '2025-10-16 14:00:00', 'Account', 'Full tank before cruise'),
(12, 'Endless Summer', 'Diesel', 500.00, 5.299, 2649.50, 2, 'Mike Torres', '2025-10-17 07:30:00', 'Account', 'Tournament departure'),
(3, 'Reel Therapy', 'Gas', 95.00, 4.899, 465.41, 1, 'Mike Torres', '2025-10-17 10:00:00', 'Credit Card', NULL),
(14, 'Sea Scout', 'Gas', 25.00, 4.899, 122.48, 1, 'Jake Rivera', '2025-10-17 11:30:00', 'Cash', NULL),
(15, 'Tiki Time', 'Gas', 30.00, 4.899, 146.97, 1, 'Jake Rivera', '2025-10-17 13:00:00', 'Cash', NULL),
(17, 'Wave Rider', 'Gas', 55.00, 4.899, 269.45, 1, 'Mike Torres', '2025-10-18 09:00:00', 'Credit Card', NULL),
(7, 'Island Hopper', 'Gas', 40.00, 4.899, 195.96, 1, 'Mike Torres', '2025-10-18 10:30:00', 'Cash', NULL),
(18, 'Majestic', 'Diesel', 600.00, 5.299, 3179.40, 2, 'Jake Rivera', '2025-10-18 13:00:00', 'Account', 'Full tanks - weekend cruise'),
(11, 'Lady Grace', 'Diesel', 280.00, 5.299, 1483.72, 2, 'Jake Rivera', '2025-10-19 08:00:00', 'Account', NULL),
(NULL, 'Visitor - Day Tripper', 'Gas', 65.00, 5.099, 331.44, 1, 'Mike Torres', '2025-10-19 11:00:00', 'Credit Card', 'Transient vessel'),
(NULL, 'Visitor - Mahi Runner', 'Gas', 120.00, 5.099, 611.88, 1, 'Jake Rivera', '2025-10-19 14:30:00', 'Credit Card', 'Transient vessel'),
(9, 'Nauti Girl', 'Gas', 88.00, 4.899, 431.11, 1, 'Mike Torres', '2025-10-20 09:00:00', 'Credit Card', NULL),
(4, 'Wind Dancer', 'Diesel', 35.00, 5.299, 185.47, 2, 'Jake Rivera', '2025-10-20 10:00:00', 'Credit Card', 'Sailboat diesel top-off'),
(13, 'Bay Runner', 'Gas', 35.00, 4.899, 171.47, 1, 'Mike Torres', '2025-10-20 15:00:00', 'Cash', NULL),
(16, 'Compass Rose', 'Diesel', 20.00, 5.299, 105.98, 2, 'Jake Rivera', '2025-10-21 10:00:00', 'Credit Card', NULL);

-- ========================================
-- LAUNCH SCHEDULE (18 entries)
-- ========================================
INSERT INTO launch_schedule (boat_name, owner_name, phone, boat_type, length_ft, launch_date, launch_time, retrieval_date, retrieval_time, ramp_number, status, fee, notes) VALUES
('Sunshine Express', 'Tom Henderson', '(954) 555-2001', 'Bay Boat', 21.0, '2025-10-25', '07:00', '2025-10-25', '17:00', 1, 'scheduled', 35.00, 'Day fishing trip'),
('Bass Master', 'Rick Owens', '(954) 555-2002', 'Bass Boat', 18.0, '2025-10-25', '06:30', '2025-10-25', '14:00', 2, 'scheduled', 30.00, 'Bass tournament'),
('Family Fun', 'Steve Adams', '(305) 555-2003', 'Pontoon', 24.0, '2025-10-25', '09:00', '2025-10-25', '16:00', 1, 'scheduled', 40.00, NULL),
('Speed Demon', 'Alex Cruz', '(954) 555-2004', 'Performance', 22.0, '2025-10-25', '10:00', '2025-10-25', '18:00', 2, 'scheduled', 35.00, 'Wake boarding'),
('Kayak Trailer', 'Lisa Park', '(954) 555-2005', 'Kayak/Canoe', 16.0, '2025-10-26', '08:00', '2025-10-26', '12:00', 1, 'scheduled', 15.00, 'Kayak group - 4 boats on trailer'),
('Reef Runner', 'Dave Collins', '(561) 555-2006', 'Center Console', 23.0, '2025-10-26', '06:00', '2025-10-26', '15:00', 2, 'scheduled', 35.00, 'Reef fishing'),
('Jet Setter', 'Mike Brown', '(954) 555-2007', 'Jet Ski', 12.0, '2025-10-26', '09:00', '2025-10-26', '13:00', 1, 'scheduled', 20.00, '2 jet skis on trailer'),
('Lady Luck', 'Frank Miller', '(305) 555-2008', 'Walkaround', 25.0, '2025-10-26', '07:30', '2025-10-27', '16:00', 2, 'scheduled', 60.00, 'Overnight trip - 2 day launch'),
('Wave Catcher', 'Derek Young', '(954) 555-2009', 'Bowrider', 20.0, '2025-10-27', '08:00', '2025-10-27', '17:00', 1, 'scheduled', 35.00, NULL),
('The Navigator', 'Bill Fox', '(561) 555-2010', 'Cabin Cruiser', 28.0, '2025-10-27', '07:00', '2025-10-28', '11:00', 2, 'scheduled', 75.00, 'Multi-day trip to Bahamas'),
('Angler One', 'Pete Garcia', '(954) 555-2011', 'Flats Boat', 17.0, '2025-10-27', '06:00', '2025-10-27', '12:00', 1, 'scheduled', 25.00, 'Tarpon fishing'),
('Party Barge', 'Sam Wilson', '(305) 555-2012', 'Pontoon', 26.0, '2025-10-28', '10:00', '2025-10-28', '18:00', 1, 'scheduled', 40.00, 'Birthday party on water'),
('Minnow', 'Greg Hall', '(954) 555-2013', 'Skiff', 14.0, '2025-10-28', '06:30', '2025-10-28', '11:00', 2, 'scheduled', 20.00, NULL),
('Blue Thunder', 'Tony Diaz', '(954) 555-2014', 'Center Console', 26.0, '2025-10-28', '07:00', '2025-10-28', '16:00', 1, 'scheduled', 40.00, 'Deep sea charter'),
('Island Girl', 'Carlos Vega', '(305) 555-2015', 'Catamaran', 22.0, '2025-10-29', '09:00', '2025-10-29', '17:00', 2, 'scheduled', 40.00, 'Sandbar trip'),
('Reel Deal', 'Jim Cooper', '(561) 555-2016', 'Center Console', 24.0, '2025-10-14', '06:30', '2025-10-14', '15:00', 1, 'completed', 35.00, NULL),
('Sunset Chaser', 'Ron Black', '(954) 555-2017', 'Bowrider', 21.0, '2025-10-13', '16:00', '2025-10-13', '20:00', 2, 'completed', 30.00, 'Sunset cruise'),
('Gone Fishing', 'Ed Turner', '(954) 555-2018', 'Flats Boat', 18.0, '2025-10-12', '05:30', '2025-10-12', '12:00', 1, 'completed', 25.00, 'Pre-dawn launch');

-- ========================================
-- DRY STORAGE (18 bays)
-- ========================================
INSERT INTO dry_storage (bay_number, section, level, max_length_ft, max_weight_lbs, boat_id, boat_name, tenant_id, monthly_rate, status, start_date, end_date, notes) VALUES
('DS-A1', 'Alpha', 1, 28.0, 8000.0, NULL, NULL, NULL, 275.00, 'available', NULL, NULL, 'Ground level - easy access'),
('DS-A2', 'Alpha', 1, 28.0, 8000.0, NULL, 'Trailer Queen', NULL, 300.00, 'occupied', '2025-06-01', '2026-05-31', 'Non-tenant storage'),
('DS-A3', 'Alpha', 2, 25.0, 6000.0, NULL, NULL, NULL, 250.00, 'available', NULL, NULL, 'Second level rack'),
('DS-A4', 'Alpha', 2, 25.0, 6000.0, NULL, 'Little Dipper', NULL, 250.00, 'occupied', '2025-03-01', '2026-02-28', NULL),
('DS-A5', 'Alpha', 3, 22.0, 5000.0, NULL, 'Splash Zone', NULL, 225.00, 'occupied', '2025-01-01', '2025-12-31', NULL),
('DS-B1', 'Bravo', 1, 32.0, 10000.0, NULL, NULL, NULL, 350.00, 'available', NULL, NULL, 'Oversized ground bay'),
('DS-B2', 'Bravo', 1, 32.0, 10000.0, NULL, 'No Worries', NULL, 350.00, 'occupied', '2025-04-01', '2026-03-31', NULL),
('DS-B3', 'Bravo', 2, 28.0, 8000.0, NULL, NULL, NULL, 300.00, 'available', NULL, NULL, NULL),
('DS-B4', 'Bravo', 2, 28.0, 8000.0, NULL, 'Castaway', NULL, 300.00, 'occupied', '2025-07-01', '2026-06-30', NULL),
('DS-B5', 'Bravo', 3, 24.0, 5500.0, NULL, 'Sea Biscuit', NULL, 260.00, 'occupied', '2025-01-01', '2025-12-31', NULL),
('DS-C1', 'Charlie', 1, 26.0, 7000.0, NULL, 'Drifter', NULL, 285.00, 'occupied', '2025-05-01', '2026-04-30', NULL),
('DS-C2', 'Charlie', 1, 26.0, 7000.0, NULL, NULL, NULL, 285.00, 'available', NULL, NULL, NULL),
('DS-C3', 'Charlie', 2, 24.0, 6000.0, NULL, 'Happy Days', NULL, 260.00, 'occupied', '2025-02-01', '2026-01-31', NULL),
('DS-C4', 'Charlie', 2, 24.0, 6000.0, NULL, 'Tide Runner', NULL, 260.00, 'occupied', '2025-08-01', '2026-07-31', NULL),
('DS-C5', 'Charlie', 3, 20.0, 4500.0, NULL, NULL, NULL, 220.00, 'maintenance', NULL, NULL, 'Rack repair needed'),
('DS-D1', 'Delta', 1, 35.0, 12000.0, NULL, 'Freedom', NULL, 400.00, 'occupied', '2025-01-01', '2025-12-31', 'Premium ground bay'),
('DS-D2', 'Delta', 1, 35.0, 12000.0, NULL, 'Second Wind', NULL, 400.00, 'occupied', '2025-03-01', '2026-02-28', NULL),
('DS-D3', 'Delta', 2, 30.0, 9000.0, NULL, NULL, NULL, 325.00, 'available', NULL, NULL, NULL);

-- ========================================
-- TRANSIENT DOCKING (16 entries)
-- ========================================
INSERT INTO transient_docking (boat_name, captain_name, phone, email, boat_length_ft, boat_type, slip_id, arrival_date, departure_date, nightly_rate, total_charge, payment_status, status, notes) VALUES
('Wanderlust', 'Capt. James Hardy', '(786) 555-3001', 'jhardy@email.com', 42.0, 'Motor Yacht', 6, '2025-10-20', '2025-10-23', 75.00, 225.00, 'paid', 'checked_out', 'ICW cruiser heading south'),
('Northern Star', 'Capt. Bill Tucker', '(207) 555-3002', 'btucker@email.com', 38.0, 'Trawler', 6, '2025-10-25', '2025-10-28', 68.00, 204.00, 'pending', 'reserved', 'Coming from Maine'),
('Carpe Diem', 'Sandra Holmes', '(941) 555-3003', 'sholmes@email.com', 35.0, 'Sailboat', 10, '2025-10-26', '2025-10-29', 60.00, 180.00, 'pending', 'reserved', 'Needs deep water slip'),
('Vitamin Sea', 'Mark Bennett', '(772) 555-3004', 'mbennett@email.com', 28.0, 'Center Console', 21, '2025-10-25', '2025-10-26', 42.00, 42.00, 'paid', 'confirmed', 'One night only'),
('Dreamweaver', 'Capt. Ron Pierce', '(843) 555-3005', 'rpierce@email.com', 50.0, 'Motor Yacht', 18, '2025-10-28', '2025-11-02', 110.00, 550.00, 'pending', 'reserved', 'Extended stay - snowbird'),
('Aqua Vitae', 'Thomas Grant', '(954) 555-3006', 'tgrant@email.com', 32.0, 'Express Cruiser', 25, '2025-10-22', '2025-10-24', 55.00, 110.00, 'paid', 'checked_out', NULL),
('Pacific Dream', 'Capt. Amy Nakamura', '(310) 555-3007', 'anakamura@email.com', 45.0, 'Catamaran', 30, '2025-10-27', '2025-11-03', 160.00, 1120.00, 'pending', 'reserved', 'Wide beam - needs end slip'),
('Sea Sprite', 'Don Freeman', '(954) 555-3008', 'dfreeman@email.com', 24.0, 'Bowrider', 27, '2025-10-25', '2025-10-26', 35.00, 35.00, 'paid', 'confirmed', 'Local visitor'),
('Miss Behavin', 'Larry Cook', '(561) 555-3009', 'lcook@email.com', 36.0, 'Sportfish', 6, '2025-11-01', '2025-11-04', 65.00, 195.00, 'pending', 'reserved', 'Fishing tournament entry'),
('Moonraker', 'Capt. Edward Shaw', '(202) 555-3010', 'eshaw@email.com', 55.0, 'Motor Yacht', 30, '2025-11-05', '2025-11-12', 160.00, 1120.00, 'pending', 'reserved', 'DC snowbird - annual visitor'),
('Trade Wind', 'Jennifer Costa', '(321) 555-3011', 'jcosta@email.com', 40.0, 'Sailboat', 18, '2025-11-01', '2025-11-05', 88.00, 352.00, 'pending', 'reserved', NULL),
('Day Tripper', 'Mark Sullivan', '(954) 555-3012', 'msullivan@email.com', 22.0, 'Center Console', 28, '2025-10-19', '2025-10-19', 25.00, 25.00, 'paid', 'checked_out', 'Day use only'),
('Lucky Penny', 'Diane Ross', '(772) 555-3013', 'dross@email.com', 30.0, 'Trawler', 10, '2025-11-02', '2025-11-06', 55.00, 220.00, 'pending', 'reserved', 'Loop cruiser'),
('Bella Luna', 'Capt. Marco Rossi', '(305) 555-3014', 'mrossi@email.com', 48.0, 'Motor Yacht', 18, '2025-11-10', '2025-11-15', 100.00, 500.00, 'pending', 'reserved', NULL),
('Wild Card', 'Steve Powers', '(954) 555-3015', 'spowers@email.com', 34.0, 'Express Cruiser', 25, '2025-10-30', '2025-11-01', 60.00, 120.00, 'pending', 'reserved', NULL),
('Serendipity', 'Karen Walsh', '(561) 555-3016', 'kwalsh@email.com', 26.0, 'Cuddy Cabin', 21, '2025-10-28', '2025-10-29', 42.00, 42.00, 'pending', 'reserved', NULL);

-- ========================================
-- WINTER STORAGE (16 entries)
-- ========================================
INSERT INTO winter_storage (boat_id, boat_name, owner_name, storage_type, location, haul_out_date, launch_date, shrink_wrap, block_stand, monthly_rate, total_contract, status, winterization_done, notes) VALUES
(NULL, 'Northern Lights', 'Phil Jackson', 'indoor', 'Building A - Bay 3', '2025-11-01', '2026-04-01', false, true, 450.00, 2250.00, 'active', true, 'Climate controlled storage'),
(NULL, 'Harbor Queen', 'Ed Walsh', 'outdoor', 'Yard Row C - Spot 5', '2025-11-15', '2026-03-15', true, true, 275.00, 1100.00, 'active', true, 'Shrink wrapped'),
(NULL, 'Second Chance', 'Mary Torres', 'indoor', 'Building A - Bay 7', '2025-10-25', '2026-04-15', false, true, 450.00, 2700.00, 'active', true, NULL),
(NULL, 'Rascal', 'Joe DiMaggio', 'outdoor', 'Yard Row A - Spot 2', '2025-11-01', '2026-03-01', true, true, 250.00, 1000.00, 'active', false, 'Winterization scheduled Nov 5'),
(NULL, 'Blue Moon', 'Karen Abbott', 'covered', 'Covered Row B - Spot 4', '2025-10-20', '2026-04-01', false, true, 375.00, 1875.00, 'active', true, 'Under covered canopy'),
(NULL, 'Sea Dog', 'Stan Lee', 'outdoor', 'Yard Row B - Spot 8', '2025-11-10', '2026-03-20', true, true, 225.00, 900.00, 'scheduled', false, 'Haul out next week'),
(NULL, 'Calypso', 'Rita Moreno', 'indoor', 'Building B - Bay 2', '2025-10-15', '2026-05-01', false, true, 500.00, 3250.00, 'active', true, 'Extended winter storage'),
(NULL, 'Patriot', 'Bob Smith', 'outdoor', 'Yard Row A - Spot 6', '2025-11-05', '2026-03-15', true, true, 300.00, 1350.00, 'scheduled', false, NULL),
(NULL, 'Midnight Sun', 'Olga Petrov', 'covered', 'Covered Row A - Spot 1', '2025-10-28', '2026-04-01', false, true, 400.00, 2000.00, 'active', true, NULL),
(NULL, 'Pegasus', 'Art Franklin', 'outdoor', 'Yard Row C - Spot 1', '2025-11-15', '2026-03-01', true, true, 200.00, 700.00, 'scheduled', false, 'Small sailboat'),
(NULL, 'Thunder Bay', 'Nick Fury', '  outdoor', 'Yard Row B - Spot 3', '2025-11-01', '2026-04-15', true, true, 325.00, 1625.00, 'active', true, NULL),
(NULL, 'Stargazer', 'Diana Prince', 'indoor', 'Building B - Bay 5', '2025-10-20', '2026-04-01', false, true, 475.00, 2375.00, 'active', true, 'Premium indoor spot'),
(NULL, 'Vagabond', 'Bruce Banner', 'outdoor', 'Yard Row D - Spot 2', '2025-11-20', '2026-03-15', true, true, 250.00, 1000.00, 'scheduled', false, 'Late season haul out'),
(NULL, 'Poseidon', 'Clark Kent', 'covered', 'Covered Row B - Spot 7', '2025-10-25', '2026-04-15', false, true, 400.00, 2200.00, 'active', true, '45ft sailboat'),
(NULL, 'First Light', 'Tony Stark', 'indoor', 'Building A - Bay 1', '2025-10-10', '2026-05-15', false, true, 550.00, 3850.00, 'active', true, 'VIP storage - premium vessel'),
(NULL, 'Gypsy Wind', 'Natasha Roman', 'outdoor', 'Yard Row A - Spot 10', '2025-11-08', '2026-03-20', true, true, 275.00, 1100.00, 'scheduled', false, NULL);

-- ========================================
-- WORK ORDERS (18 entries)
-- ========================================
INSERT INTO work_orders (title, description, category, priority, status, location, assigned_to, reported_by, reported_date, due_date, completed_date, estimated_cost, actual_cost, notes) VALUES
('Replace dock boards - A dock', 'Several boards on A dock between slips A-6 and A-8 are rotting and need replacement', 'Dock Repair', 'high', 'in_progress', 'Dock A - Section 3', 'Carlos Mendez', 'Harbor Master', '2025-10-10', '2025-10-25', NULL, 2500.00, NULL, 'Lumber ordered - arriving Oct 20'),
('Fix water line leak - C dock', 'Water pressure drop reported at C-9, likely pipe leak under dock', 'Plumbing', 'high', 'open', 'Dock C - Slip C-9', 'Ray Johnson', 'Nancy Wilson', '2025-10-18', '2025-10-22', NULL, 800.00, NULL, 'Slip taken out of service'),
('Electrical panel upgrade - B-4', 'Upgrade from 50amp to 100amp service per tenant request', 'Electrical', 'medium', 'scheduled', 'Dock B - Slip B-4', 'Tom Electric LLC', 'Sarah Anderson', '2025-10-05', '2025-11-01', NULL, 3500.00, NULL, 'Permit approved by county'),
('Security camera replacement', 'Camera #7 at fuel dock entrance not recording - replace unit', 'Security', 'high', 'open', 'Fuel Dock', 'Security Team', 'Jake Rivera', '2025-10-19', '2025-10-21', NULL, 450.00, NULL, NULL),
('Piling inspection - Dock A', 'Annual piling structural inspection required by insurance', 'Inspection', 'medium', 'scheduled', 'Dock A - All pilings', 'Marine Structures Inc', 'Harbor Master', '2025-10-01', '2025-11-15', NULL, 5000.00, NULL, 'Insurance requirement'),
('Paint dock office exterior', 'Office building exterior paint peeling - repaint needed', 'Building Maintenance', 'low', 'open', 'Marina Office', 'Coastal Painters', 'Admin', '2025-10-12', '2025-12-01', NULL, 4200.00, NULL, 'Get 3 quotes'),
('Repair travel lift rail', 'South rail showing wear - needs resurfacing before winter haul outs', 'Equipment', 'high', 'in_progress', 'Travel Lift Bay', 'Heavy Equipment Services', 'Carlos Mendez', '2025-10-08', '2025-10-30', NULL, 8500.00, NULL, 'Critical for winter season'),
('Replace fire extinguishers', 'Annual fire extinguisher inspection - 8 units need replacement', 'Safety', 'high', 'completed', 'All Docks', 'ABC Fire Safety', 'Harbor Master', '2025-10-01', '2025-10-15', '2025-10-14', 640.00, 592.00, 'All 8 units replaced'),
('Dredging survey - Dock C', 'Silt buildup reported at low tide in C dock basin', 'Dredging', 'medium', 'open', 'Dock C Basin', 'Marine Surveyors LLC', 'Christopher Brown', '2025-10-15', '2025-11-30', NULL, 2000.00, NULL, 'Survey before full dredge quote'),
('WiFi access point replacement', 'WiFi dead zone between B-3 and B-5 - add access point', 'IT/Technology', 'low', 'scheduled', 'Dock B', 'IT Solutions', 'Multiple tenants', '2025-10-10', '2025-11-15', NULL, 350.00, NULL, NULL),
('Pump out station repair', 'Station #2 pump motor overheating', 'Equipment', 'high', 'in_progress', 'Pump Out Station 2', 'Carlos Mendez', 'Mike Torres', '2025-10-17', '2025-10-23', NULL, 1200.00, NULL, 'Replacement motor on order'),
('Parking lot pothole repair', 'Large pothole near marina entrance - safety hazard', 'Grounds', 'high', 'completed', 'Main Parking Lot', 'Asphalt Kings', 'Admin', '2025-10-05', '2025-10-10', '2025-10-09', 350.00, 325.00, 'Cold patch applied'),
('Install new dock cleats - D dock', 'Yacht basin needs heavy duty cleats for larger vessels', 'Dock Hardware', 'medium', 'open', 'Dock D', 'Carlos Mendez', 'Mark Davis', '2025-10-20', '2025-11-15', NULL, 1800.00, NULL, 'Stainless steel cleats ordered'),
('Bathroom renovation - North head', 'North restroom facility needs full renovation', 'Building Maintenance', 'medium', 'scheduled', 'North Restroom', 'Premier Contractors', 'Admin', '2025-09-15', '2025-12-15', NULL, 15000.00, NULL, 'Plans approved - start Nov 1'),
('Replace dock lighting - C dock', '4 LED fixtures burned out on C dock', 'Electrical', 'medium', 'open', 'Dock C', 'Tom Electric LLC', 'Harbor Master', '2025-10-18', '2025-10-30', NULL, 600.00, NULL, NULL),
('Fuel pump calibration', 'Annual fuel pump calibration required by state', 'Compliance', 'high', 'scheduled', 'Fuel Dock', 'Fuel Systems Inc', 'Harbor Master', '2025-10-01', '2025-10-31', NULL, 750.00, NULL, 'State inspection due Nov 1'),
('Repair seawall section', 'Minor crack in seawall near Dock A entrance', 'Structural', 'medium', 'open', 'Seawall - Dock A entrance', 'Marine Structures Inc', 'Harbor Master', '2025-10-14', '2025-12-01', NULL, 6000.00, NULL, 'Monitor before repair'),
('Replace windsock', 'Windsock at channel entrance torn', 'Safety', 'low', 'completed', 'Channel Entrance', 'Carlos Mendez', 'Harbor Master', '2025-10-16', '2025-10-20', '2025-10-18', 75.00, 65.00, NULL);

-- ========================================
-- HAUL OUTS (16 entries)
-- ========================================
INSERT INTO haul_outs (boat_id, boat_name, owner_name, equipment_type, scheduled_date, scheduled_time, service_type, estimated_duration, status, fee, operator, notes) VALUES
(1, 'Sea Breeze', 'Robert Harrison', 'travel_lift', '2025-10-25', '08:00', 'Bottom paint', '2 hours', 'scheduled', 450.00, 'Carlos Mendez', 'Annual bottom job'),
(5, 'Ocean King', 'Catherine Russo', 'travel_lift', '2025-10-25', '10:30', 'Hull inspection', '1.5 hours', 'scheduled', 550.00, 'Carlos Mendez', NULL),
(8, 'Blue Horizon', 'Richard Thompson', 'travel_lift', '2025-10-26', '08:00', 'Prop repair', '3 hours', 'scheduled', 500.00, 'Carlos Mendez', 'Bent prop from debris strike'),
(4, 'Wind Dancer', 'William O''Brien', 'travel_lift', '2025-10-26', '13:00', 'Bottom paint + zinc replacement', '4 hours', 'scheduled', 650.00, 'Carlos Mendez', 'Sailboat - deep keel'),
(12, 'Endless Summer', 'David Martinez', 'marine_railway', '2025-10-27', '07:00', 'Running gear inspection', '2 hours', 'scheduled', 750.00, 'Heavy Lift Team', 'Large vessel - needs railway'),
(NULL, 'Northern Lights', 'Phil Jackson', 'travel_lift', '2025-11-01', '08:00', 'Winter haul out', '1 hour', 'scheduled', 400.00, 'Carlos Mendez', 'Going to winter storage'),
(NULL, 'Harbor Queen', 'Ed Walsh', 'travel_lift', '2025-11-15', '09:00', 'Winter haul out', '1 hour', 'scheduled', 350.00, 'Carlos Mendez', 'Outdoor winter storage'),
(NULL, 'Sea Dog', 'Stan Lee', 'travel_lift', '2025-11-10', '08:00', 'Winter haul out + bottom paint', '3 hours', 'scheduled', 550.00, 'Carlos Mendez', NULL),
(NULL, 'Patriot', 'Bob Smith', 'travel_lift', '2025-11-05', '10:00', 'Winter haul out', '1 hour', 'scheduled', 375.00, 'Carlos Mendez', NULL),
(18, 'Majestic', 'Mark Davis', 'marine_railway', '2025-10-28', '07:00', 'Hull cleaning + survey', '4 hours', 'scheduled', 1200.00, 'Heavy Lift Team', '58ft yacht - special handling'),
(9, 'Nauti Girl', 'Elizabeth Kim', 'travel_lift', '2025-10-29', '08:00', 'Through-hull replacement', '3 hours', 'scheduled', 500.00, 'Carlos Mendez', NULL),
(3, 'Reel Therapy', 'Patricia Chen', 'travel_lift', '2025-10-30', '09:00', 'Blister repair', '2 hours', 'scheduled', 475.00, 'Carlos Mendez', 'Osmotic blister treatment'),
(NULL, 'Vagabond', 'Bruce Banner', 'travel_lift', '2025-11-20', '08:00', 'Winter haul out', '1 hour', 'scheduled', 400.00, 'Carlos Mendez', 'Late season'),
(6, 'Grand Escape', 'Thomas Walker', 'marine_railway', '2025-11-02', '07:00', 'Bottom paint + running gear', '5 hours', 'scheduled', 900.00, 'Heavy Lift Team', '43ft Azimut'),
(NULL, 'Gypsy Wind', 'Natasha Roman', 'travel_lift', '2025-11-08', '10:00', 'Winter haul out', '1.5 hours', 'scheduled', 375.00, 'Carlos Mendez', NULL),
(10, 'Fish Tales', 'Michael Gonzalez', 'travel_lift', '2025-10-22', '08:00', 'Transducer install', '2 hours', 'completed', 425.00, 'Carlos Mendez', 'New fishfinder transducer');

-- ========================================
-- PUMP OUT LOG (18 entries)
-- ========================================
INSERT INTO pump_out_log (boat_name, slip_number, service_date, gallons_pumped, operator, pump_station, fee, compliance_tag, notes) VALUES
('Sea Breeze', 'A-1', '2025-10-14 09:00:00', 15.00, 'Mike Torres', 1, 0.00, 'CPT-2025-0901', NULL),
('Reel Therapy', 'A-3', '2025-10-14 09:30:00', 25.00, 'Mike Torres', 1, 0.00, 'CPT-2025-0902', 'Live-aboard - weekly pump out'),
('Ocean King', 'A-5', '2025-10-14 10:00:00', 35.00, 'Jake Rivera', 2, 0.00, 'CPT-2025-0903', NULL),
('Grand Escape', 'A-8', '2025-10-14 10:45:00', 50.00, 'Jake Rivera', 2, 0.00, 'CPT-2025-0904', 'Large holding tank'),
('Blue Horizon', 'B-1', '2025-10-15 08:30:00', 20.00, 'Mike Torres', 1, 0.00, 'CPT-2025-0905', NULL),
('Lady Grace', 'B-4', '2025-10-15 09:15:00', 30.00, 'Mike Torres', 1, 0.00, 'CPT-2025-0906', NULL),
('Endless Summer', 'B-5', '2025-10-15 10:00:00', 65.00, 'Jake Rivera', 2, 0.00, 'CPT-2025-0907', 'Largest holding tank in marina'),
('Majestic', 'D-1', '2025-10-15 11:00:00', 80.00, 'Jake Rivera', 2, 0.00, 'CPT-2025-0908', 'Yacht - double pump required'),
('Wanderlust', 'A-6', '2025-10-20 14:00:00', 30.00, 'Mike Torres', 1, 15.00, 'CPT-2025-0909', 'Transient vessel - fee charged'),
('Fish Tales', 'B-3', '2025-10-16 09:00:00', 18.00, 'Mike Torres', 1, 0.00, 'CPT-2025-0910', NULL),
('Nauti Girl', 'B-2', '2025-10-16 09:45:00', 22.00, 'Jake Rivera', 1, 0.00, 'CPT-2025-0911', NULL),
('Wind Dancer', 'A-4', '2025-10-17 08:00:00', 12.00, 'Mike Torres', 1, 0.00, 'CPT-2025-0912', 'Sailboat - small tank'),
('Sea Scout', 'C-1', '2025-10-17 08:30:00', 8.00, 'Mike Torres', 1, 0.00, 'CPT-2025-0913', 'Portable tank'),
('Reel Therapy', 'A-3', '2025-10-21 09:00:00', 25.00, 'Mike Torres', 1, 0.00, 'CPT-2025-0914', 'Weekly service'),
('Wave Rider', 'C-5', '2025-10-18 10:00:00', 14.00, 'Jake Rivera', 1, 0.00, 'CPT-2025-0915', NULL),
('Lucky Strike', 'A-2', '2025-10-19 09:00:00', 16.00, 'Mike Torres', 1, 0.00, 'CPT-2025-0916', NULL),
('Day Tripper', NULL, '2025-10-19 11:30:00', 10.00, 'Jake Rivera', 2, 15.00, 'CPT-2025-0917', 'Transient - day visitor'),
('Compass Rose', 'C-4', '2025-10-20 08:00:00', 10.00, 'Mike Torres', 1, 0.00, 'CPT-2025-0918', NULL);

-- ========================================
-- ENVIRONMENTAL COMPLIANCE (16 entries)
-- ========================================
INSERT INTO environmental_compliance (item_type, item_name, location, inspection_date, expiry_date, status, inspector, certificate_number, description, action_required, notes) VALUES
('Spill Kit', 'Fuel Dock Spill Kit A', 'Fuel Dock - North', '2025-09-15', '2026-09-15', 'compliant', 'DEP Inspector R. Williams', 'SK-2025-001', 'Oil/fuel spill containment kit - 50 gallon capacity', NULL, 'Inspected and fully stocked'),
('Spill Kit', 'Fuel Dock Spill Kit B', 'Fuel Dock - South', '2025-09-15', '2026-09-15', 'compliant', 'DEP Inspector R. Williams', 'SK-2025-002', 'Oil/fuel spill containment kit - 50 gallon capacity', NULL, NULL),
('Stormwater Permit', 'NPDES Stormwater Permit', 'Marina-wide', '2025-07-01', '2026-07-01', 'compliant', 'EPA Region 4', 'NPDES-FL-2025-0456', 'National Pollutant Discharge Elimination System permit', NULL, 'Annual renewal required'),
('Oil/Water Separator', 'Bilge Water Treatment System', 'Maintenance Building', '2025-08-20', '2026-08-20', 'compliant', 'DEP Inspector R. Williams', 'OWS-2025-001', 'Bilge water processing and treatment system', NULL, 'Processing 200+ gallons/month'),
('Fuel Storage Tank', 'Underground Gas Tank #1', 'Fuel Dock', '2025-06-15', '2026-06-15', 'compliant', 'Tank Inspection Services', 'UST-2025-001', '10,000 gallon underground gasoline storage', NULL, 'No leaks detected'),
('Fuel Storage Tank', 'Underground Diesel Tank #1', 'Fuel Dock', '2025-06-15', '2026-06-15', 'compliant', 'Tank Inspection Services', 'UST-2025-002', '8,000 gallon underground diesel storage', NULL, NULL),
('Clean Marina Certification', 'FL Clean Marina Program', 'Marina-wide', '2025-03-01', '2027-03-01', 'compliant', 'FL DEP Clean Marina', 'FCM-2025-0089', 'Florida Clean Marina designation', NULL, 'Bi-annual certification'),
('Pumpout Station', 'Pump Out Station #1', 'Dock A', '2025-09-01', '2026-09-01', 'compliant', 'DEP Inspector K. Martinez', 'PO-2025-001', 'CVA Clean Vessel Act compliant pumpout station', NULL, NULL),
('Pumpout Station', 'Pump Out Station #2', 'Dock B', '2025-09-01', '2026-09-01', 'non_compliant', 'DEP Inspector K. Martinez', 'PO-2025-002', 'CVA Clean Vessel Act compliant pumpout station', 'Motor repair needed - station temporarily offline', 'See work order #11'),
('Waste Oil Collection', 'Used Oil Collection Tank', 'Maintenance Yard', '2025-08-01', '2026-02-01', 'compliant', 'Waste Management Inc', 'WO-2025-001', '500 gallon used oil collection and recycling', NULL, 'Pickup scheduled monthly'),
('Absorbent Boom', 'Harbor Entrance Boom', 'Marina Entrance Channel', '2025-09-20', '2026-03-20', 'compliant', 'Harbor Master', 'AB-2025-001', 'Permanent absorbent boom for harbor protection', NULL, 'Replace every 6 months'),
('Air Quality Permit', 'Boat Yard Operations Permit', 'Boat Yard', '2025-04-15', '2026-04-15', 'compliant', 'Broward County Environmental', 'AQP-2025-001', 'Permit for sanding, painting, and fiberglass work', NULL, NULL),
('Manatee Protection', 'Manatee Zone Signage', 'Marina-wide', '2025-05-01', '2026-05-01', 'compliant', 'FWC Inspector', 'MP-2025-001', 'Idle speed/no wake zone signage for manatee protection', NULL, '12 signs maintained'),
('Fire Safety', 'Marina Fire Suppression', 'All Docks', '2025-10-14', '2026-10-14', 'compliant', 'ABC Fire Safety', 'FS-2025-001', 'Fire extinguishers and suppression system inspection', NULL, '8 units replaced - see work order'),
('Sewage Discharge', 'No Discharge Zone Compliance', 'Marina Basin', '2025-07-15', '2026-07-15', 'compliant', 'EPA Region 4', 'NDZ-2025-001', 'Federal No Discharge Zone compliance verification', NULL, 'All vessels must use pumpout'),
('Hazmat Storage', 'Hazardous Materials Locker', 'Maintenance Building', '2025-08-10', '2026-02-10', 'warning', 'Broward County Fire', 'HM-2025-001', 'Paint, solvent, and chemical storage locker', 'Ventilation fan needs repair', 'Semi-annual inspection');

-- ========================================
-- WEATHER DATA (18 entries)
-- ========================================
INSERT INTO weather_data (recorded_at, temperature_f, wind_speed_mph, wind_direction, humidity_pct, pressure_inhg, visibility_miles, wave_height_ft, water_temp_f, conditions, forecast, alerts) VALUES
('2025-10-21 06:00:00', 75.2, 8.5, 'ESE', 78.0, 30.12, 10.0, 1.5, 80.1, 'Partly Cloudy', 'Partly cloudy with afternoon showers possible. Winds ESE 8-12 mph.', NULL),
('2025-10-21 12:00:00', 84.6, 12.3, 'SE', 65.0, 30.08, 10.0, 2.0, 81.2, 'Sunny', 'Clear skies through evening. Light SE winds.', NULL),
('2025-10-21 18:00:00', 79.8, 6.2, 'S', 72.0, 30.05, 10.0, 1.2, 80.8, 'Clear', 'Clear and calm overnight. Perfect boating conditions tomorrow.', NULL),
('2025-10-22 06:00:00', 73.5, 5.8, 'SW', 80.0, 30.15, 8.0, 1.0, 79.5, 'Hazy', 'Morning haze clearing by 9am. Light winds all day.', NULL),
('2025-10-22 12:00:00', 86.1, 14.7, 'SSE', 58.0, 30.02, 10.0, 2.5, 81.5, 'Sunny', 'Warm and breezy. Small craft advisory possible tomorrow.', NULL),
('2025-10-22 18:00:00', 80.3, 10.1, 'SE', 68.0, 29.98, 10.0, 2.0, 81.0, 'Partly Cloudy', 'Building clouds. Rain likely overnight.', NULL),
('2025-10-23 06:00:00', 72.8, 18.5, 'E', 85.0, 29.85, 5.0, 3.5, 79.2, 'Rainy', 'Rain and gusty winds through midday. Clearing by evening.', 'Small Craft Advisory until 2pm'),
('2025-10-23 12:00:00', 76.4, 22.0, 'ENE', 82.0, 29.80, 3.0, 4.5, 79.0, 'Stormy', 'Thunderstorms possible. Winds gusting to 30 mph.', 'Small Craft Advisory - Winds 20-30 mph'),
('2025-10-23 18:00:00', 77.1, 15.3, 'NE', 75.0, 29.90, 7.0, 3.0, 79.5, 'Clearing', 'Clearing skies. Winds diminishing overnight.', NULL),
('2025-10-24 06:00:00', 70.5, 7.2, 'N', 70.0, 30.10, 10.0, 1.5, 78.8, 'Clear', 'Beautiful day ahead. Light north winds. Great boating weather.', NULL),
('2025-10-24 12:00:00', 82.3, 9.8, 'NNE', 55.0, 30.15, 10.0, 1.0, 80.0, 'Sunny', 'Excellent conditions. Low humidity. Calm seas.', NULL),
('2025-10-24 18:00:00', 78.9, 5.5, 'NE', 62.0, 30.18, 10.0, 0.8, 79.8, 'Clear', 'Clear and calm. Perfect sunset cruise conditions.', NULL),
('2025-10-25 06:00:00', 71.8, 4.2, 'E', 75.0, 30.20, 10.0, 0.5, 79.0, 'Clear', 'Calm morning. Increasing clouds by afternoon.', NULL),
('2025-10-25 12:00:00', 85.0, 11.5, 'SE', 60.0, 30.12, 10.0, 1.5, 81.0, 'Partly Cloudy', 'Scattered clouds. Slight chance of afternoon pop-up showers.', NULL),
('2025-10-25 18:00:00', 80.5, 8.0, 'SSE', 70.0, 30.08, 10.0, 1.2, 80.5, 'Partly Cloudy', 'Partly cloudy evening. Weekend looking good.', NULL),
('2025-10-26 06:00:00', 74.0, 6.5, 'E', 76.0, 30.05, 9.0, 1.0, 79.8, 'Mostly Cloudy', 'Overcast morning, clearing by noon. SE winds 8-12.', NULL),
('2025-10-26 12:00:00', 83.7, 13.0, 'SE', 62.0, 29.98, 10.0, 2.0, 80.8, 'Sunny', 'Sunny and warm. Good conditions for weekend boaters.', NULL),
('2025-10-26 18:00:00', 79.2, 9.5, 'S', 68.0, 29.95, 10.0, 1.5, 80.2, 'Clear', 'Clear evening. Watch for tropical disturbance developing east.', 'Tropical Weather Outlook - Monitor conditions');

-- ========================================
-- SHIP STORE SALES (20 entries)
-- ========================================
INSERT INTO ship_store_sales (item_name, category, quantity, unit_price, total_price, customer_name, payment_method, sale_date, clerk, notes) VALUES
('Dock Line 3/4" x 25ft', 'Lines & Rope', 2, 34.99, 69.98, 'Robert Harrison', 'Credit Card', '2025-10-20 09:15:00', 'Amy Chen', NULL),
('Marine Sunscreen SPF 50', 'Personal Care', 3, 12.99, 38.97, 'Walk-in Customer', 'Cash', '2025-10-20 10:30:00', 'Amy Chen', NULL),
('Stainless Steel Shackle 1/2"', 'Hardware', 4, 8.50, 34.00, 'William O''Brien', 'Account', '2025-10-20 11:00:00', 'Amy Chen', 'For sailboat rigging'),
('Interlux Bottomkote NT - Gallon', 'Paint & Coatings', 2, 189.99, 379.98, 'Richard Thompson', 'Credit Card', '2025-10-20 14:00:00', 'Dave Morris', 'Haul out prep'),
('LED Navigation Light Set', 'Electronics', 1, 124.95, 124.95, 'Christopher Brown', 'Credit Card', '2025-10-21 09:00:00', 'Amy Chen', 'Port/Starboard combo'),
('Bag of Ice - 20lb', 'Provisions', 5, 5.99, 29.95, 'Catherine Russo', 'Cash', '2025-10-21 06:30:00', 'Dave Morris', 'Tournament day'),
('Star Brite Hull Cleaner', 'Cleaning Supplies', 2, 16.99, 33.98, 'James Mitchell', 'Credit Card', '2025-10-21 10:15:00', 'Amy Chen', NULL),
('Marine Battery - Group 27', 'Batteries', 1, 219.99, 219.99, 'Michael Gonzalez', 'Credit Card', '2025-10-21 13:00:00', 'Dave Morris', 'Installed in slip'),
('Zinc Anode - Shaft 1.5"', 'Anodes', 3, 22.50, 67.50, 'Patricia Chen', 'Account', '2025-10-22 09:30:00', 'Amy Chen', 'Pre-haul out purchase'),
('Yeti Tumbler 30oz', 'Gifts & Apparel', 2, 39.99, 79.98, 'Walk-in Customer', 'Credit Card', '2025-10-22 11:00:00', 'Amy Chen', 'Marina logo'),
('First Aid Kit - Marine', 'Safety', 1, 45.99, 45.99, 'Thomas Walker', 'Account', '2025-10-22 14:30:00', 'Dave Morris', NULL),
('Fender 8" x 27"', 'Fenders & Bumpers', 4, 29.99, 119.96, 'Mark Davis', 'Account', '2025-10-23 09:00:00', 'Amy Chen', 'Yacht basin - extra protection'),
('Engine Oil 15W-40 - Quart', 'Engine & Mechanical', 6, 11.99, 71.94, 'David Martinez', 'Credit Card', '2025-10-23 10:00:00', 'Dave Morris', 'Diesel engine oil change'),
('Marina Polo Shirt - XL', 'Gifts & Apparel', 1, 49.99, 49.99, 'Walk-in Customer', 'Credit Card', '2025-10-23 15:00:00', 'Amy Chen', NULL),
('Garmin Chartplotter Mount', 'Electronics', 1, 89.95, 89.95, 'Jennifer Lee', 'Credit Card', '2025-10-24 09:00:00', 'Dave Morris', NULL),
('Snack Box - Assorted', 'Provisions', 3, 8.99, 26.97, 'Walk-in Customer', 'Cash', '2025-10-24 07:00:00', 'Amy Chen', 'Early morning fishermen'),
('Boat Soap Concentrate - Gallon', 'Cleaning Supplies', 1, 24.99, 24.99, 'Elizabeth Kim', 'Account', '2025-10-24 11:30:00', 'Amy Chen', NULL),
('VHF Radio - Handheld', 'Electronics', 1, 149.99, 149.99, 'Sarah Anderson', 'Credit Card', '2025-10-24 14:00:00', 'Dave Morris', 'Standard Horizon HX210'),
('Anchor - 15lb Fluke', 'Ground Tackle', 1, 79.99, 79.99, 'Nancy Wilson', 'Credit Card', '2025-10-25 09:00:00', 'Amy Chen', NULL),
('Cooler - 45 Quart', 'Provisions', 1, 64.99, 64.99, 'Walk-in Customer', 'Cash', '2025-10-25 08:00:00', 'Dave Morris', 'Weekend trip');

-- ========================================
-- WAITING LIST (16 entries)
-- ========================================
INSERT INTO waiting_list (first_name, last_name, email, phone, boat_name, boat_length_ft, boat_type, preferred_dock, preferred_slip_type, request_date, priority_score, status, notes) VALUES
('George', 'Franklin', 'gfranklin@email.com', '(954) 555-4001', 'Star Chaser', 32.0, 'Express Cruiser', 'B', 'wet', '2025-01-15', 85, 'waiting', 'Referred by current tenant Robert Harrison'),
('Helen', 'Morgan', 'hmorgan@email.com', '(305) 555-4002', 'Salty Dog', 28.0, 'Center Console', 'A', 'wet', '2025-02-01', 72, 'waiting', 'Relocating from Miami marina'),
('Kevin', 'Brooks', 'kbrooks@email.com', '(561) 555-4003', 'Reel Estate', 36.0, 'Sportfish', 'B', 'wet', '2025-02-15', 90, 'waiting', 'Will pay premium for B dock'),
('Lisa', 'Nguyen', 'lnguyen@email.com', '(954) 555-4004', 'Zen Master', 40.0, 'Sailboat', 'A', 'wet', '2025-03-01', 65, 'waiting', 'Needs deep draft slip'),
('Paul', 'Rivera', 'privera@email.com', '(305) 555-4005', 'Mi Vida', 24.0, 'Bowrider', 'C', 'wet', '2025-03-15', 50, 'waiting', 'Budget conscious - C dock preferred'),
('Rachel', 'Cooper', 'rcooper@email.com', '(954) 555-4006', 'Grace Note', 35.0, 'Trawler', 'B', 'wet', '2025-04-01', 78, 'waiting', 'Live-aboard request'),
('Scott', 'Hughes', 'shughes@email.com', '(561) 555-4007', 'Night Owl', 42.0, 'Motor Yacht', 'D', 'wet', '2025-04-15', 95, 'waiting', 'Needs 100amp service - yacht basin'),
('Teresa', 'Campbell', 'tcampbell@email.com', '(954) 555-4008', 'Sweet Caroline', 22.0, 'Deck Boat', 'C', 'wet', '2025-05-01', 40, 'waiting', NULL),
('Victor', 'Reed', 'vreed@email.com', '(305) 555-4009', 'Aqua Man', 30.0, 'Walkaround', 'A', 'wet', '2025-05-15', 68, 'waiting', 'Flexible on dock assignment'),
('Wendy', 'Price', 'wprice@email.com', '(954) 555-4010', 'Lady Bug', 26.0, 'Cuddy Cabin', 'C', 'wet', '2025-06-01', 55, 'waiting', NULL),
('Alan', 'Stewart', 'astewart@email.com', '(561) 555-4011', 'Iron Horse', 48.0, 'Sportfish', 'D', 'wet', '2025-06-15', 92, 'waiting', 'Current marina closing - urgent'),
('Betty', 'Ross', 'bross@email.com', '(954) 555-4012', 'Pura Vida', 20.0, 'Skiff', 'C', 'wet', '2025-07-01', 35, 'waiting', 'First time boat owner'),
('Carl', 'Edwards', 'cedwards@email.com', '(305) 555-4013', 'Double Down', 38.0, 'Catamaran', 'B', 'wet', '2025-07-15', 82, 'waiting', 'Wide beam - needs end slip'),
('Diana', 'Foster', 'dfoster@email.com', '(954) 555-4014', 'Misty', 25.0, 'Center Console', 'A', 'wet', '2025-08-01', 60, 'waiting', NULL),
('Eric', 'Grant', 'egrant@email.com', '(561) 555-4015', 'Money Pit', 55.0, 'Motor Yacht', 'D', 'wet', '2025-08-15', 98, 'waiting', 'Will sign multi-year lease'),
('Fiona', 'Walsh', 'fwalsh@email.com', '(954) 555-4016', 'Seascape', 28.0, 'Sailboat', 'A', 'wet', '2025-09-01', 58, 'waiting', 'Weekend sailor');

-- ========================================
-- HURRICANE PREP (18 entries)
-- ========================================
INSERT INTO hurricane_prep (checklist_name, category, task_description, assigned_to, priority, status, due_date, completed_date, storm_name, notes) VALUES
('Pre-Season Prep 2025', 'Planning', 'Update hurricane plan and distribute to all tenants', 'Harbor Master', 'critical', 'completed', '2025-06-01', '2025-05-28', NULL, 'Plan updated and emailed to all tenants'),
('Pre-Season Prep 2025', 'Supplies', 'Inventory and restock emergency supplies (batteries, tarps, lines)', 'Carlos Mendez', 'high', 'completed', '2025-06-01', '2025-05-30', NULL, '$2,400 spent on supplies'),
('Pre-Season Prep 2025', 'Equipment', 'Test backup generator and ensure 72-hour fuel supply', 'Ray Johnson', 'critical', 'completed', '2025-06-01', '2025-05-25', NULL, 'Generator tested - 96 hour fuel supply confirmed'),
('Pre-Season Prep 2025', 'Communications', 'Test VHF radio systems and emergency communication plan', 'Harbor Master', 'high', 'completed', '2025-06-01', '2025-05-29', NULL, 'All 4 VHF stations operational'),
('Pre-Season Prep 2025', 'Documentation', 'Collect updated insurance certificates from all tenants', 'Admin Office', 'medium', 'completed', '2025-06-15', '2025-06-12', NULL, '15 of 18 tenants compliant'),
('Pre-Season Prep 2025', 'Structural', 'Inspect all dock cleats and hardware for storm readiness', 'Carlos Mendez', 'high', 'completed', '2025-06-01', '2025-06-01', NULL, '6 cleats replaced on C dock'),
('Storm Watch - TD 12', 'Monitoring', 'Monitor Tropical Depression 12 - potential Gulf development', 'Harbor Master', 'medium', 'completed', '2025-09-15', '2025-09-15', 'TD 12', 'Dissipated - no threat'),
('Storm Watch - Hurricane Maria', 'Alert Level 1', 'Issue tenant notification - Hurricane Maria 5 days out', 'Harbor Master', 'high', 'completed', '2025-10-05', '2025-10-05', 'Hurricane Maria', 'Email and text blast sent'),
('Storm Watch - Hurricane Maria', 'Alert Level 2', 'Begin vessel securing - double all dock lines', 'Carlos Mendez', 'critical', 'completed', '2025-10-06', '2025-10-06', 'Hurricane Maria', 'All occupied slips secured'),
('Storm Watch - Hurricane Maria', 'Alert Level 2', 'Remove all canvas, biminis, and loose items from vessels', 'All Tenants', 'high', 'completed', '2025-10-06', '2025-10-06', 'Hurricane Maria', 'Compliance check completed'),
('Storm Watch - Hurricane Maria', 'Alert Level 2', 'Secure fuel dock - close and lock pumps', 'Jake Rivera', 'critical', 'completed', '2025-10-07', '2025-10-07', 'Hurricane Maria', 'Fuel operations suspended'),
('Storm Watch - Hurricane Maria', 'Alert Level 3', 'Final walkthrough - all vessels secured, marina evacuated', 'Harbor Master', 'critical', 'completed', '2025-10-07', '2025-10-07', 'Hurricane Maria', 'Storm passed 200 miles east - minimal impact'),
('Post-Storm Assessment', 'Damage Assessment', 'Inspect all docks and pilings for storm damage', 'Carlos Mendez', 'critical', 'completed', '2025-10-09', '2025-10-09', 'Hurricane Maria', 'Minor damage only - 2 dock boards displaced'),
('Post-Storm Assessment', 'Utilities', 'Check all electrical and water systems post-storm', 'Ray Johnson', 'high', 'completed', '2025-10-09', '2025-10-09', 'Hurricane Maria', 'All systems operational'),
('Post-Storm Assessment', 'Vessels', 'Check all boats for damage and report to owners', 'Harbor Master', 'high', 'completed', '2025-10-09', '2025-10-09', 'Hurricane Maria', 'No vessel damage reported'),
('Post-Storm Assessment', 'Cleanup', 'Clear debris from marina basin and docks', 'Maintenance Crew', 'medium', 'completed', '2025-10-10', '2025-10-10', 'Hurricane Maria', 'Minor debris cleared in 2 hours'),
('Season Monitoring', 'Planning', 'Review and update hurricane plan based on Maria lessons learned', 'Harbor Master', 'medium', 'pending', '2025-11-01', NULL, NULL, 'Schedule post-season review meeting'),
('Season Monitoring', 'Monitoring', 'Continue monitoring tropical weather through November 30', 'Harbor Master', 'medium', 'in_progress', '2025-11-30', NULL, NULL, 'Peak season winding down');

-- ========================================
-- PARKING PERMITS (16 entries)
-- ========================================
INSERT INTO parking_permits (tenant_id, permit_number, vehicle_make, vehicle_model, vehicle_color, license_plate, state, lot_zone, start_date, expiry_date, status, fee, notes) VALUES
(1, 'PKG-2025-001', 'Ford', 'F-150', 'White', 'ABC 1234', 'FL', 'Zone A', '2025-01-01', '2025-12-31', 'active', 120.00, 'Truck with boat trailer access'),
(2, 'PKG-2025-002', 'Toyota', 'Tacoma', 'Silver', 'DEF 5678', 'FL', 'Zone A', '2025-03-01', '2026-02-28', 'active', 120.00, NULL),
(3, 'PKG-2025-003', 'BMW', 'X5', 'Black', 'GHI 9012', 'FL', 'Zone B', '2025-01-01', '2025-12-31', 'active', 100.00, NULL),
(4, 'PKG-2025-004', 'Chevrolet', 'Suburban', 'Blue', 'JKL 3456', 'FL', 'Zone A', '2025-04-01', '2026-03-31', 'active', 120.00, 'Large vehicle - end spot'),
(5, 'PKG-2025-005', 'Mercedes', 'GLE', 'White', 'MNO 7890', 'FL', 'Zone B', '2025-01-01', '2025-12-31', 'active', 100.00, NULL),
(6, 'PKG-2025-006', 'Land Rover', 'Range Rover', 'Gray', 'PQR 1234', 'FL', 'Zone B', '2025-02-01', '2026-01-31', 'active', 100.00, NULL),
(7, 'PKG-2025-007', 'Honda', 'CR-V', 'Red', 'STU 5678', 'FL', 'Zone C', '2025-06-01', '2025-11-30', 'active', 50.00, 'Seasonal permit'),
(8, 'PKG-2025-008', 'Dodge', 'Ram 2500', 'Black', 'VWX 9012', 'FL', 'Zone A', '2025-01-01', '2025-12-31', 'active', 120.00, 'Diesel truck'),
(9, 'PKG-2025-009', 'Tesla', 'Model Y', 'White', 'YZA 3456', 'FL', 'Zone B', '2025-03-01', '2026-02-28', 'active', 100.00, 'EV charging spot requested'),
(10, 'PKG-2025-010', 'Jeep', 'Grand Cherokee', 'Green', 'BCD 7890', 'FL', 'Zone A', '2025-01-01', '2025-12-31', 'active', 120.00, NULL),
(11, 'PKG-2025-011', 'Lexus', 'RX 350', 'Pearl', 'EFG 1234', 'FL', 'Zone B', '2025-01-01', '2025-12-31', 'active', 100.00, NULL),
(12, 'PKG-2025-012', 'GMC', 'Sierra', 'Red', 'HIJ 5678', 'FL', 'Zone A', '2025-02-01', '2026-01-31', 'active', 120.00, 'Trailer parking included'),
(13, 'PKG-2025-013', 'Nissan', 'Pathfinder', 'Silver', 'KLM 9012', 'FL', 'Zone C', '2025-05-01', '2025-10-31', 'active', 50.00, 'Seasonal'),
(14, 'PKG-2025-014', 'Hyundai', 'Tucson', 'Blue', 'NOP 3456', 'FL', 'Zone C', '2025-01-01', '2025-12-31', 'active', 75.00, NULL),
(15, 'PKG-2025-015', 'Kia', 'Sorento', 'White', 'QRS 7890', 'FL', 'Zone C', '2025-01-01', '2025-12-31', 'active', 75.00, NULL),
(16, 'PKG-2025-016', 'Subaru', 'Outback', 'Green', 'TUV 1234', 'FL', 'Zone C', '2025-04-01', '2026-03-31', 'active', 75.00, NULL);

-- ========================================
-- AMENITY ACCESS (18 entries)
-- ========================================
INSERT INTO amenity_access (tenant_id, tenant_name, amenity_type, access_code, key_number, start_date, end_date, status, monthly_fee, notes) VALUES
(1, 'Robert Harrison', 'Pool', '4521', NULL, '2025-01-01', '2025-12-31', 'active', 25.00, NULL),
(1, 'Robert Harrison', 'Shower/Laundry', '4521', 'K-101', '2025-01-01', '2025-12-31', 'active', 0.00, 'Included with slip rental'),
(2, 'James Mitchell', 'Pool', '3847', NULL, '2025-03-01', '2026-02-28', 'active', 25.00, NULL),
(3, 'Patricia Chen', 'Pool', '7293', NULL, '2025-01-01', '2025-12-31', 'active', 25.00, NULL),
(3, 'Patricia Chen', 'Fitness Center', '7293', 'K-102', '2025-01-01', '2025-12-31', 'active', 35.00, NULL),
(5, 'Catherine Russo', 'Pool', '1654', NULL, '2025-01-01', '2025-12-31', 'active', 25.00, NULL),
(5, 'Catherine Russo', 'Captain''s Lounge', '1654', 'K-103', '2025-01-01', '2025-12-31', 'active', 50.00, 'Premium amenity'),
(6, 'Thomas Walker', 'Pool', '8912', NULL, '2025-02-01', '2026-01-31', 'active', 25.00, NULL),
(6, 'Thomas Walker', 'Fitness Center', '8912', 'K-104', '2025-02-01', '2026-01-31', 'active', 35.00, NULL),
(6, 'Thomas Walker', 'Captain''s Lounge', '8912', 'K-105', '2025-02-01', '2026-01-31', 'active', 50.00, NULL),
(8, 'Richard Thompson', 'Pool', '5537', NULL, '2025-01-01', '2025-12-31', 'active', 25.00, NULL),
(10, 'Michael Gonzalez', 'Pool', '2210', NULL, '2025-01-01', '2025-12-31', 'active', 25.00, NULL),
(11, 'Sarah Anderson', 'Pool', '6688', NULL, '2025-01-01', '2025-12-31', 'active', 25.00, NULL),
(11, 'Sarah Anderson', 'Captain''s Lounge', '6688', 'K-106', '2025-01-01', '2025-12-31', 'active', 50.00, NULL),
(12, 'David Martinez', 'Pool', '9944', NULL, '2025-02-01', '2026-01-31', 'active', 25.00, NULL),
(12, 'David Martinez', 'Captain''s Lounge', '9944', 'K-107', '2025-02-01', '2026-01-31', 'active', 50.00, 'Yacht basin tenant benefit'),
(18, 'Mark Davis', 'Pool', '1177', NULL, '2025-01-01', '2025-12-31', 'active', 0.00, 'Complimentary - premium tenant'),
(18, 'Mark Davis', 'Captain''s Lounge', '1177', 'K-108', '2025-01-01', '2025-12-31', 'active', 0.00, 'Complimentary - premium tenant');

-- ========================================
-- FINANCIAL RECORDS (20 entries)
-- ========================================
INSERT INTO financial_records (record_type, category, description, amount, tenant_id, slip_id, invoice_number, due_date, paid_date, payment_method, status, late_fee, notes) VALUES
('invoice', 'Slip Rental', 'October 2025 slip rental - A-1', 850.00, 1, 1, 'INV-2025-1001', '2025-10-01', '2025-09-28', 'Auto-Pay', 'paid', 0.00, NULL),
('invoice', 'Slip Rental', 'October 2025 slip rental - A-2', 800.00, 2, 2, 'INV-2025-1002', '2025-10-01', '2025-10-01', 'Check', 'paid', 0.00, NULL),
('invoice', 'Slip Rental', 'October 2025 slip rental - A-3', 1050.00, 3, 3, 'INV-2025-1003', '2025-10-01', '2025-09-30', 'Auto-Pay', 'paid', 0.00, NULL),
('invoice', 'Slip Rental', 'October 2025 slip rental - A-5', 1400.00, 5, 5, 'INV-2025-1005', '2025-10-01', '2025-10-03', 'Credit Card', 'paid', 0.00, 'Paid 2 days late - no fee assessed'),
('invoice', 'Slip Rental', 'October 2025 slip rental - A-8', 1800.00, 6, 8, 'INV-2025-1006', '2025-10-01', '2025-09-29', 'Wire Transfer', 'paid', 0.00, NULL),
('invoice', 'Slip Rental', 'October 2025 slip rental - B-5', 2200.00, 12, 15, 'INV-2025-1012', '2025-10-01', NULL, NULL, 'overdue', 50.00, 'Sent reminder on Oct 15'),
('invoice', 'Utilities', 'September electric/water - A-1', 43.97, 1, 1, 'INV-2025-U1001', '2025-10-15', '2025-10-12', 'Auto-Pay', 'paid', 0.00, NULL),
('invoice', 'Utilities', 'September electric/water - A-3', 80.75, 3, 3, 'INV-2025-U1003', '2025-10-15', '2025-10-14', 'Auto-Pay', 'paid', 0.00, 'Live-aboard surcharge included'),
('invoice', 'Utilities', 'September electric/water - A-8', 134.80, 6, 8, 'INV-2025-U1006', '2025-10-15', '2025-10-15', 'Wire Transfer', 'paid', 0.00, NULL),
('invoice', 'Utilities', 'September electric/water - D-1', 185.40, 18, 29, 'INV-2025-U1018', '2025-10-15', '2025-10-10', 'Wire Transfer', 'paid', 0.00, 'Yacht basin premium metering'),
('payment', 'Deposit', 'Security deposit - James Mitchell', 1600.00, 2, 2, 'DEP-2025-002', '2025-03-01', '2025-03-01', 'Check', 'paid', 0.00, 'Held in escrow'),
('payment', 'Deposit', 'Security deposit - Thomas Walker', 3600.00, 6, 8, 'DEP-2025-006', '2025-02-01', '2025-02-01', 'Wire Transfer', 'paid', 0.00, NULL),
('invoice', 'Amenities', 'October pool/fitness access - Patricia Chen', 60.00, 3, NULL, 'INV-2025-AM03', '2025-10-01', '2025-09-30', 'Auto-Pay', 'paid', 0.00, NULL),
('invoice', 'Amenities', 'October pool/lounge access - Thomas Walker', 110.00, 6, NULL, 'INV-2025-AM06', '2025-10-01', '2025-10-01', 'Auto-Pay', 'paid', 0.00, NULL),
('expense', 'Maintenance', 'Dock board lumber purchase - A dock repair', -2150.00, NULL, NULL, 'EXP-2025-0045', '2025-10-20', '2025-10-20', 'Company Card', 'paid', 0.00, 'See work order #1'),
('expense', 'Equipment', 'Fire extinguisher replacement x8', -592.00, NULL, NULL, 'EXP-2025-0046', '2025-10-14', '2025-10-14', 'Company Card', 'paid', 0.00, 'See work order #8'),
('invoice', 'Slip Rental', 'November 2025 slip rental - A-1', 850.00, 1, 1, 'INV-2025-1101', '2025-11-01', NULL, NULL, 'pending', 0.00, 'Upcoming'),
('invoice', 'Slip Rental', 'November 2025 slip rental - A-3', 1050.00, 3, 3, 'INV-2025-1103', '2025-11-01', NULL, NULL, 'pending', 0.00, NULL),
('invoice', 'Parking', 'Annual parking permit renewal - Zone A', 120.00, 1, NULL, 'INV-2025-PKG01', '2025-12-01', NULL, NULL, 'pending', 0.00, 'Renewal notice sent'),
('credit', 'Adjustment', 'Credit for water leak impact - C-9 area', -75.00, 14, 19, 'CRD-2025-001', '2025-10-20', '2025-10-20', 'Account Credit', 'paid', 0.00, 'Goodwill credit during C dock water repair');

-- ========================================
-- SEASONAL RATES (16 entries)
-- ========================================
INSERT INTO seasonal_rates (season_name, start_date, end_date, slip_type, base_rate_per_foot, electric_rate_kwh, water_rate_gallon, live_aboard_surcharge, transient_daily_rate, fuel_markup_pct, status, notes) VALUES
('Winter 2025-2026', '2025-11-01', '2026-03-31', 'wet', 28.50, 0.140, 0.008, 200.00, 3.50, 15.00, 'active', 'Peak season - snowbird rates'),
('Summer 2025', '2025-05-01', '2025-10-31', 'wet', 22.00, 0.140, 0.008, 175.00, 2.75, 12.00, 'active', 'Off-peak rates'),
('Winter 2025-2026', '2025-11-01', '2026-03-31', 'dry', 12.50, NULL, NULL, 0.00, NULL, NULL, 'active', 'Dry storage winter rate per foot'),
('Summer 2025', '2025-05-01', '2025-10-31', 'dry', 10.00, NULL, NULL, 0.00, NULL, NULL, 'active', 'Dry storage summer rate'),
('Winter 2025-2026', '2025-11-01', '2026-03-31', 'mooring', 15.00, NULL, NULL, 0.00, 2.00, NULL, 'active', 'Mooring ball winter rate'),
('Summer 2025', '2025-05-01', '2025-10-31', 'mooring', 12.00, NULL, NULL, 0.00, 1.50, NULL, 'active', NULL),
('Holiday Premium', '2025-12-20', '2026-01-05', 'wet', 35.00, 0.140, 0.008, 200.00, 5.00, 18.00, 'active', 'Holiday surcharge period'),
('Spring Break', '2026-03-15', '2026-03-31', 'wet', 30.00, 0.140, 0.008, 200.00, 4.00, 15.00, 'active', NULL),
('Boat Show Week', '2025-10-29', '2025-11-02', 'wet', 32.00, 0.140, 0.008, 200.00, 6.00, 18.00, 'active', 'Fort Lauderdale International Boat Show'),
('Hurricane Season', '2025-06-01', '2025-11-30', 'wet', 22.00, 0.140, 0.008, 175.00, 2.50, 12.00, 'active', 'Reduced transient rate during hurricane season'),
('Winter 2024-2025', '2024-11-01', '2025-03-31', 'wet', 27.00, 0.135, 0.008, 185.00, 3.25, 14.00, 'expired', 'Previous season rates'),
('Summer 2024', '2024-05-01', '2024-10-31', 'wet', 21.00, 0.135, 0.008, 170.00, 2.50, 11.00, 'expired', NULL),
('Annual Contract 2025', '2025-01-01', '2025-12-31', 'wet', 20.00, 0.130, 0.007, 150.00, NULL, 10.00, 'active', 'Discount rate for annual lease commitment'),
('Annual Contract 2025', '2025-01-01', '2025-12-31', 'dry', 9.00, NULL, NULL, 0.00, NULL, NULL, 'active', 'Annual dry storage commitment rate'),
('Yacht Basin Premium', '2025-01-01', '2025-12-31', 'wet', 45.00, 0.140, 0.008, 250.00, 8.00, 12.00, 'active', 'D dock yacht basin premium rates'),
('Tournament Week', '2025-11-10', '2025-11-16', 'wet', 30.00, 0.140, 0.008, 200.00, 5.50, 15.00, 'active', 'Annual fishing tournament premium');

-- ========================================
-- INSURANCE REQUIREMENTS (18 entries)
-- ========================================
INSERT INTO insurance_requirements (boat_id, tenant_id, tenant_name, boat_name, policy_number, insurance_company, coverage_type, coverage_amount, deductible, effective_date, expiry_date, liability_amount, status, verified, notes) VALUES
(1, 1, 'Robert Harrison', 'Sea Breeze', 'MIC-2025-001', 'Marine Insurance Co', 'Hull & Liability', 175000.00, 2500.00, '2025-01-01', '2025-12-31', 500000.00, 'active', true, 'Verified Oct 1'),
(2, 2, 'James Mitchell', 'Lucky Strike', 'BUS-2025-002', 'BoatUS Insurance', 'Hull & Liability', 150000.00, 2000.00, '2025-03-01', '2026-02-28', 500000.00, 'active', true, NULL),
(3, 3, 'Patricia Chen', 'Reel Therapy', 'PM-2025-003', 'Progressive Marine', 'Full Coverage', 225000.00, 3000.00, '2025-01-01', '2025-12-31', 1000000.00, 'active', true, NULL),
(4, 4, 'William O''Brien', 'Wind Dancer', 'GM-2025-004', 'Geico Marine', 'Hull & Liability', 180000.00, 2500.00, '2025-04-01', '2026-03-31', 500000.00, 'active', true, NULL),
(5, 5, 'Catherine Russo', 'Ocean King', 'UMI-2025-005', 'United Marine Insurance', 'Full Coverage', 450000.00, 5000.00, '2025-01-01', '2025-12-31', 1000000.00, 'active', true, 'Tournament coverage included'),
(6, 6, 'Thomas Walker', 'Grand Escape', 'CM-2025-006', 'Chubb Marine', 'Full Coverage', 850000.00, 10000.00, '2025-02-01', '2026-01-31', 2000000.00, 'active', true, 'High value yacht coverage'),
(7, 7, 'Maria Santos', 'Island Hopper', 'ASB-2025-007', 'AllState Boaters', 'Hull & Liability', 65000.00, 1000.00, '2025-06-01', '2025-11-30', 300000.00, 'active', true, 'Seasonal policy'),
(8, 8, 'Richard Thompson', 'Blue Horizon', 'MIC-2025-008', 'Marine Insurance Co', 'Full Coverage', 320000.00, 3500.00, '2025-01-01', '2025-12-31', 1000000.00, 'active', true, NULL),
(9, 9, 'Elizabeth Kim', 'Nauti Girl', 'PM-2025-009', 'Progressive Marine', 'Hull & Liability', 200000.00, 2500.00, '2025-03-01', '2026-02-28', 500000.00, 'active', true, NULL),
(10, 10, 'Michael Gonzalez', 'Fish Tales', 'BUS-2025-010', 'BoatUS Insurance', 'Full Coverage', 380000.00, 4000.00, '2025-01-01', '2025-12-31', 1000000.00, 'active', true, NULL),
(11, 11, 'Sarah Anderson', 'Lady Grace', 'CM-2025-011', 'Chubb Marine', 'Full Coverage', 750000.00, 7500.00, '2025-01-01', '2025-12-31', 2000000.00, 'active', true, 'Flybridge yacht premium'),
(12, 12, 'David Martinez', 'Endless Summer', 'UMI-2025-012', 'United Marine Insurance', 'Full Coverage', 1200000.00, 15000.00, '2025-02-01', '2026-01-31', 2000000.00, 'active', false, 'Awaiting updated certificate'),
(13, 13, 'Jennifer Lee', 'Bay Runner', 'GM-2025-013', 'Geico Marine', 'Hull & Liability', 45000.00, 1000.00, '2025-05-01', '2025-10-31', 300000.00, 'expiring_soon', true, 'Seasonal - expires next month'),
(14, 14, 'Christopher Brown', 'Sea Scout', 'ASB-2025-014', 'AllState Boaters', 'Basic Liability', 35000.00, 500.00, '2025-01-01', '2025-12-31', 300000.00, 'active', true, 'Minimum coverage met'),
(15, 15, 'Nancy Wilson', 'Tiki Time', 'MIC-2025-015', 'Marine Insurance Co', 'Hull & Liability', 40000.00, 750.00, '2025-01-01', '2025-12-31', 300000.00, 'active', true, NULL),
(16, 16, 'Daniel Taylor', 'Compass Rose', 'BUS-2025-016', 'BoatUS Insurance', 'Hull & Liability', 95000.00, 1500.00, '2025-04-01', '2026-03-31', 500000.00, 'active', true, NULL),
(17, 17, 'Barbara White', 'Wave Rider', 'PM-2025-017', 'Progressive Marine', 'Hull & Liability', 85000.00, 1500.00, '2025-01-01', '2025-12-31', 500000.00, 'active', true, NULL),
(18, 18, 'Mark Davis', 'Majestic', 'CM-2025-018', 'Chubb Marine', 'Full Coverage', 2500000.00, 25000.00, '2025-01-01', '2025-12-31', 5000000.00, 'active', true, 'Flagship vessel - max coverage');
