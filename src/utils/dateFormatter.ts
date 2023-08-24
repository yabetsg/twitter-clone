const  formatDate = (date: Date): string =>{
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

export const getDate = ()=>{
    const today: Date = new Date();
    const formattedDate: string = formatDate(today);
    return formattedDate;
}
  