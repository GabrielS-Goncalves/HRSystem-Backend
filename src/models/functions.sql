CREATE OR REPLACE FUNCTION update_updatedTime_at()
RETURNS TRIGGER AS $$
BEGIN
	NEW.updatedTime = current_timestamp;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER system_users_updatedTime_at_trigger
BEFORE UPDATE ON system_users
FOR EACH ROW
EXECUTE FUNCTION update_updatedTime_at();
