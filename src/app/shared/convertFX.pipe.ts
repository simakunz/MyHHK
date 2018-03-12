import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
  name: 'convertFX'
})

export class ConvertFX implements PipeTransform {
  transform(value: number, fxRate: number): number {
    return value * fxRate;
  }
}
