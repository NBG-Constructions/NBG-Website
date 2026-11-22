export const enquiryTypes = ['Project enquiry', 'Supplier or subcontractor', 'General'];
export const serviceNames = ['Not sure', 'Commercial construction', 'Fitouts & refurbishments', 'Project management'];
export function validateEnquiry(data) {
  const errors = {};
  const value = key => String(data[key] ?? '').trim();
  if (!value('name')) errors.name = 'Enter your name.';
  else if (value('name').length > 100) errors.name = 'Use 100 characters or fewer.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value('email')) || value('email').length > 254) errors.email = 'Enter a valid email address.';
  if (!enquiryTypes.includes(value('type'))) errors.type = 'Choose an enquiry type.';
  if (value('message').length < 10 || value('message').length > 2000) errors.message = 'Use between 10 and 2,000 characters.';
  if (value('phone').length > 50) errors.phone = 'Use 50 characters or fewer.';
  if (value('location').length > 120) errors.location = 'Use 120 characters or fewer.';
  if (value('service') && !serviceNames.includes(value('service'))) errors.service = 'Choose a listed service.';
  return errors;
}
export function formatEnquiry(data) {
  return [
    `Name: ${String(data.name).trim()}`, `Email: ${String(data.email).trim()}`,
    `Enquiry type: ${data.type}`, `Phone: ${String(data.phone || '').trim() || 'Not provided'}`,
    `Project location: ${String(data.location || '').trim() || 'Not provided'}`,
    `Service: ${data.service || 'Not sure'}`, '', String(data.message).trim(),
  ].join('\n');
}
