const getSalutationMessage = () => {
  const date = new Date();
  const horario = date.getHours();
  let tempododia;

  if (horario <= 11) {
    tempododia = 'Bom dia ';
  } else if (horario >= 12 && horario < 18) {
    tempododia = 'Boa tarde';
  } else {
    tempododia = 'Boa noite';
  }
  return tempododia;
};

export default getSalutationMessage;
