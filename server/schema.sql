-- Users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'manager',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Slips/Moorings
CREATE TABLE IF NOT EXISTS slips (
  id SERIAL PRIMARY KEY,
  slip_number VARCHAR(20) UNIQUE NOT NULL,
  dock VARCHAR(50) NOT NULL,
  length_ft DECIMAL(6,1) NOT NULL,
  width_ft DECIMAL(6,1) NOT NULL,
  depth_ft DECIMAL(6,1),
  slip_type VARCHAR(50) DEFAULT 'wet',
  has_electric BOOLEAN DEFAULT true,
  has_water BOOLEAN DEFAULT true,
  electric_amp INTEGER DEFAULT 30,
  status VARCHAR(30) DEFAULT 'available',
  monthly_rate DECIMAL(10,2),
  daily_rate DECIMAL(10,2),
  location_x DECIMAL(10,2),
  location_y DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tenants/Leases
CREATE TABLE IF NOT EXISTS tenants (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  emergency_contact VARCHAR(255),
  emergency_phone VARCHAR(20),
  slip_id INTEGER REFERENCES slips(id),
  lease_start DATE,
  lease_end DATE,
  lease_type VARCHAR(50) DEFAULT 'annual',
  monthly_rate DECIMAL(10,2),
  deposit_amount DECIMAL(10,2),
  insurance_policy VARCHAR(100),
  insurance_expiry DATE,
  status VARCHAR(30) DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Boats
CREATE TABLE IF NOT EXISTS boats (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  registration_number VARCHAR(100),
  hull_id VARCHAR(100),
  boat_type VARCHAR(100),
  manufacturer VARCHAR(100),
  model VARCHAR(100),
  year INTEGER,
  length_ft DECIMAL(6,1),
  beam_ft DECIMAL(6,1),
  draft_ft DECIMAL(6,1),
  weight_lbs DECIMAL(10,1),
  engine_type VARCHAR(100),
  engine_count INTEGER DEFAULT 1,
  fuel_type VARCHAR(50),
  color VARCHAR(50),
  tenant_id INTEGER REFERENCES tenants(id),
  slip_id INTEGER REFERENCES slips(id),
  insurance_company VARCHAR(255),
  insurance_policy VARCHAR(100),
  insurance_expiry DATE,
  status VARCHAR(30) DEFAULT 'active',
  photo_url TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Utility Metering
CREATE TABLE IF NOT EXISTS utility_readings (
  id SERIAL PRIMARY KEY,
  slip_id INTEGER REFERENCES slips(id),
  reading_date DATE NOT NULL,
  electric_kwh DECIMAL(10,2),
  water_gallons DECIMAL(10,2),
  electric_cost DECIMAL(10,2),
  water_cost DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Fuel Dock Sales
CREATE TABLE IF NOT EXISTS fuel_sales (
  id SERIAL PRIMARY KEY,
  boat_id INTEGER,
  boat_name VARCHAR(255),
  fuel_type VARCHAR(50) NOT NULL,
  gallons DECIMAL(10,2) NOT NULL,
  price_per_gallon DECIMAL(6,3) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  pump_number INTEGER,
  attendant VARCHAR(100),
  sale_date TIMESTAMP DEFAULT NOW(),
  payment_method VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Launch Ramp Schedule
CREATE TABLE IF NOT EXISTS launch_schedule (
  id SERIAL PRIMARY KEY,
  boat_name VARCHAR(255) NOT NULL,
  owner_name VARCHAR(255),
  phone VARCHAR(20),
  boat_type VARCHAR(100),
  length_ft DECIMAL(6,1),
  launch_date DATE NOT NULL,
  launch_time TIME,
  retrieval_date DATE,
  retrieval_time TIME,
  ramp_number INTEGER,
  status VARCHAR(30) DEFAULT 'scheduled',
  fee DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Dry Storage
CREATE TABLE IF NOT EXISTS dry_storage (
  id SERIAL PRIMARY KEY,
  bay_number VARCHAR(20) NOT NULL,
  section VARCHAR(50),
  level INTEGER DEFAULT 1,
  max_length_ft DECIMAL(6,1),
  max_weight_lbs DECIMAL(10,1),
  boat_id INTEGER REFERENCES boats(id),
  boat_name VARCHAR(255),
  tenant_id INTEGER REFERENCES tenants(id),
  monthly_rate DECIMAL(10,2),
  status VARCHAR(30) DEFAULT 'available',
  start_date DATE,
  end_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Transient/Visitor Docking
CREATE TABLE IF NOT EXISTS transient_docking (
  id SERIAL PRIMARY KEY,
  boat_name VARCHAR(255) NOT NULL,
  captain_name VARCHAR(255),
  phone VARCHAR(20),
  email VARCHAR(255),
  boat_length_ft DECIMAL(6,1),
  boat_type VARCHAR(100),
  slip_id INTEGER REFERENCES slips(id),
  arrival_date DATE NOT NULL,
  departure_date DATE,
  nightly_rate DECIMAL(10,2),
  total_charge DECIMAL(10,2),
  payment_status VARCHAR(30) DEFAULT 'pending',
  status VARCHAR(30) DEFAULT 'reserved',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Winter Storage
CREATE TABLE IF NOT EXISTS winter_storage (
  id SERIAL PRIMARY KEY,
  boat_id INTEGER REFERENCES boats(id),
  boat_name VARCHAR(255) NOT NULL,
  owner_name VARCHAR(255),
  storage_type VARCHAR(50) DEFAULT 'outdoor',
  location VARCHAR(100),
  haul_out_date DATE,
  launch_date DATE,
  shrink_wrap BOOLEAN DEFAULT false,
  block_stand BOOLEAN DEFAULT true,
  monthly_rate DECIMAL(10,2),
  total_contract DECIMAL(10,2),
  status VARCHAR(30) DEFAULT 'active',
  winterization_done BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Maintenance Work Orders
CREATE TABLE IF NOT EXISTS work_orders (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  priority VARCHAR(30) DEFAULT 'medium',
  status VARCHAR(30) DEFAULT 'open',
  location VARCHAR(255),
  assigned_to VARCHAR(255),
  reported_by VARCHAR(255),
  reported_date DATE DEFAULT CURRENT_DATE,
  due_date DATE,
  completed_date DATE,
  estimated_cost DECIMAL(10,2),
  actual_cost DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Haul-Out Scheduling
CREATE TABLE IF NOT EXISTS haul_outs (
  id SERIAL PRIMARY KEY,
  boat_id INTEGER REFERENCES boats(id),
  boat_name VARCHAR(255) NOT NULL,
  owner_name VARCHAR(255),
  equipment_type VARCHAR(50) DEFAULT 'travel_lift',
  scheduled_date DATE NOT NULL,
  scheduled_time TIME,
  service_type VARCHAR(100),
  estimated_duration VARCHAR(50),
  status VARCHAR(30) DEFAULT 'scheduled',
  fee DECIMAL(10,2),
  operator VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Pump-Out Log
CREATE TABLE IF NOT EXISTS pump_out_log (
  id SERIAL PRIMARY KEY,
  boat_name VARCHAR(255) NOT NULL,
  slip_number VARCHAR(20),
  service_date TIMESTAMP DEFAULT NOW(),
  gallons_pumped DECIMAL(10,2),
  operator VARCHAR(255),
  pump_station INTEGER,
  fee DECIMAL(10,2) DEFAULT 0,
  compliance_tag VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Environmental Compliance
CREATE TABLE IF NOT EXISTS environmental_compliance (
  id SERIAL PRIMARY KEY,
  item_type VARCHAR(100) NOT NULL,
  item_name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  inspection_date DATE,
  expiry_date DATE,
  status VARCHAR(30) DEFAULT 'compliant',
  inspector VARCHAR(255),
  certificate_number VARCHAR(100),
  description TEXT,
  action_required TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Weather Data
CREATE TABLE IF NOT EXISTS weather_data (
  id SERIAL PRIMARY KEY,
  recorded_at TIMESTAMP DEFAULT NOW(),
  temperature_f DECIMAL(5,1),
  wind_speed_mph DECIMAL(5,1),
  wind_direction VARCHAR(10),
  humidity_pct DECIMAL(5,1),
  pressure_inhg DECIMAL(6,2),
  visibility_miles DECIMAL(5,1),
  wave_height_ft DECIMAL(4,1),
  water_temp_f DECIMAL(5,1),
  conditions VARCHAR(100),
  forecast TEXT,
  alerts TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Ship Store Sales (POS)
CREATE TABLE IF NOT EXISTS ship_store_sales (
  id SERIAL PRIMARY KEY,
  item_name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  customer_name VARCHAR(255),
  payment_method VARCHAR(50),
  sale_date TIMESTAMP DEFAULT NOW(),
  clerk VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Waiting List
CREATE TABLE IF NOT EXISTS waiting_list (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  boat_name VARCHAR(255),
  boat_length_ft DECIMAL(6,1),
  boat_type VARCHAR(100),
  preferred_dock VARCHAR(50),
  preferred_slip_type VARCHAR(50),
  request_date DATE DEFAULT CURRENT_DATE,
  priority_score INTEGER DEFAULT 0,
  status VARCHAR(30) DEFAULT 'waiting',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Hurricane Prep Checklists
CREATE TABLE IF NOT EXISTS hurricane_prep (
  id SERIAL PRIMARY KEY,
  checklist_name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  task_description TEXT NOT NULL,
  assigned_to VARCHAR(255),
  priority VARCHAR(30) DEFAULT 'high',
  status VARCHAR(30) DEFAULT 'pending',
  due_date DATE,
  completed_date DATE,
  storm_name VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Parking Permits
CREATE TABLE IF NOT EXISTS parking_permits (
  id SERIAL PRIMARY KEY,
  tenant_id INTEGER REFERENCES tenants(id),
  permit_number VARCHAR(50) UNIQUE NOT NULL,
  vehicle_make VARCHAR(100),
  vehicle_model VARCHAR(100),
  vehicle_color VARCHAR(50),
  license_plate VARCHAR(20),
  state VARCHAR(10),
  lot_zone VARCHAR(50),
  start_date DATE,
  expiry_date DATE,
  status VARCHAR(30) DEFAULT 'active',
  fee DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Amenity Access
CREATE TABLE IF NOT EXISTS amenity_access (
  id SERIAL PRIMARY KEY,
  tenant_id INTEGER REFERENCES tenants(id),
  tenant_name VARCHAR(255),
  amenity_type VARCHAR(100) NOT NULL,
  access_code VARCHAR(50),
  key_number VARCHAR(50),
  start_date DATE,
  end_date DATE,
  status VARCHAR(30) DEFAULT 'active',
  monthly_fee DECIMAL(10,2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Financial Records
CREATE TABLE IF NOT EXISTS financial_records (
  id SERIAL PRIMARY KEY,
  record_type VARCHAR(50) NOT NULL,
  category VARCHAR(100),
  description TEXT,
  amount DECIMAL(12,2) NOT NULL,
  tenant_id INTEGER REFERENCES tenants(id),
  slip_id INTEGER REFERENCES slips(id),
  invoice_number VARCHAR(100),
  due_date DATE,
  paid_date DATE,
  payment_method VARCHAR(50),
  status VARCHAR(30) DEFAULT 'pending',
  late_fee DECIMAL(10,2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Seasonal Rates
CREATE TABLE IF NOT EXISTS seasonal_rates (
  id SERIAL PRIMARY KEY,
  season_name VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  slip_type VARCHAR(50),
  base_rate_per_foot DECIMAL(8,2),
  electric_rate_kwh DECIMAL(6,3),
  water_rate_gallon DECIMAL(6,3),
  live_aboard_surcharge DECIMAL(10,2) DEFAULT 0,
  transient_daily_rate DECIMAL(10,2),
  fuel_markup_pct DECIMAL(5,2),
  status VARCHAR(30) DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insurance Requirements
CREATE TABLE IF NOT EXISTS insurance_requirements (
  id SERIAL PRIMARY KEY,
  boat_id INTEGER REFERENCES boats(id),
  tenant_id INTEGER REFERENCES tenants(id),
  tenant_name VARCHAR(255),
  boat_name VARCHAR(255),
  policy_number VARCHAR(100),
  insurance_company VARCHAR(255),
  coverage_type VARCHAR(100),
  coverage_amount DECIMAL(12,2),
  deductible DECIMAL(10,2),
  effective_date DATE,
  expiry_date DATE,
  liability_amount DECIMAL(12,2),
  status VARCHAR(30) DEFAULT 'active',
  verified BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
