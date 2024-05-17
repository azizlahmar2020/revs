const yup = require("yup");

const studentSchema = yup.object({
  note: yup
    .number()
    .required('La note est requise.')
    .min(0, 'La note ne peut pas être inférieure à 0.')
    .max(20, 'La note ne peut pas être supérieure à 20.'),
});

module.exports = studentSchema;