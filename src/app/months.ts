export class Months {
    months: string[];
   
   constructor(){
       this.months = ['Januar', 'Februar', 'März',
       'April', 'Mai', 'Juni', 'Juli',
       'August', 'September', 'Oktober',
       'November', 'Dezember'];;
   }

   public get():string[]{
       return this.months;
   }
}