function generateRandomSerialNumber(usedSerialNumbers) {
  let randomSerialNumber;

  do {
    // Generate a two-digit random serial number
    randomSerialNumber = String(Math.floor(Math.random() * 100)).padStart(
      2,
      "0"
    );
  } while (usedSerialNumbers.has(randomSerialNumber));

  // Mark the generated serial number as used
  usedSerialNumbers.add(randomSerialNumber);

  return randomSerialNumber;
}

// Function to generate a unique number format
function generateUniqueNumber() {
  const usedSerialNumbers = new Set();

  // Generate two-digit month
  const month = String(new Date().getMonth() + 1).padStart(2, "0");

  // Generate two-digit year
  const year = String(new Date().getFullYear()).slice(-2);

  // Generate two-digit random serial number (ensuring uniqueness)
  const randomSerialNumber = generateRandomSerialNumber(usedSerialNumbers);

  // Generate five-digit random number
  // const fiveDigitRandom = String(Math.floor(Math.random() * 100000)).padStart(5, '0');
  // const fiveDigitRandom = String(Math.floor(10000 + Math.random() * 90000));
  const fourDigitRandom = String(Math.floor(1000 + Math.random() * 9000));

  // Combine all parts to create the final unique number
  const uniqueNumber = `BC${month}${year}${randomSerialNumber}${fourDigitRandom}`;

  return uniqueNumber;
}

function generateStudentUniqueNumber() {
  const usedSerialNumbers = new Set();

  // Generate two-digit month
  const month = String(new Date().getMonth() + 1).padStart(2, "0");

  // Generate two-digit year
  const year = String(new Date().getFullYear()).slice(-2);

  // Generate two-digit random serial number (ensuring uniqueness)
  const randomSerialNumber = generateRandomSerialNumber(usedSerialNumbers);

  // Generate five-digit random number
  // const fiveDigitRandom = String(Math.floor(Math.random() * 100000)).padStart(5, '0');
  // const fiveDigitRandom = String(Math.floor(10000 + Math.random() * 90000));
  const fourDigitRandom = String(Math.floor(1000 + Math.random() * 9000));

  // Combine all parts to create the final unique number
  const uniqueNumber = `CGST${month}${year}${randomSerialNumber}${fourDigitRandom}`;

  return uniqueNumber;
}

function generateStafUniqueNumber() {
  const usedSerialNumbers = new Set();

  // Generate two-digit month
  const month = String(new Date().getMonth() + 1).padStart(2, "0");

  // Generate two-digit year
  const year = String(new Date().getFullYear()).slice(-2);

  // Generate two-digit random serial number (ensuring uniqueness)
  const randomSerialNumber = generateRandomSerialNumber(usedSerialNumbers);

  // Generate five-digit random number
  // const fiveDigitRandom = String(Math.floor(Math.random() * 100000)).padStart(5, '0');
  // const fiveDigitRandom = String(Math.floor(10000 + Math.random() * 90000));
  const fourDigitRandom = String(Math.floor(1000 + Math.random() * 9000));

  // Combine all parts to create the final unique number
  const uniqueNumber = `CGSF${month}${year}${randomSerialNumber}${fourDigitRandom}`;

  return uniqueNumber;
}

const generatedPasswords = new Set();

function generateUniqueRandomPassword() {
  const length = 8;
  const charset = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%&";
  let password;

  do {
    password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
  } while (generatedPasswords.has(password));

  generatedPasswords.add(password);
  return password;
}

function generateTicketNumbers(prefix, count, eventRemainingTickets) {
  const ticketNumbers = [];

  for (let i = 0; i < count; i++) {
    ticketNumbers.push(`${prefix}${eventRemainingTickets - i}`);
  }

  return ticketNumbers;
}

module.exports = {
  generateUniqueNumber,
  generateUniqueRandomPassword,
  generateTicketNumbers,
  generateStudentUniqueNumber,
  generateStafUniqueNumber
};
