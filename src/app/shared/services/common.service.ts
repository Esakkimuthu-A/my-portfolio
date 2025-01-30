import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private supabase!: SupabaseClient;
  isDarkTheme !: boolean;

  constructor() {
    this.supabase= createClient(environment.supabase.url, environment.supabase.key);
  }

  getTheme() {
    return localStorage.getItem('theme');
  }

  setTheme(value: any) {
    this.isDarkTheme = value;
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light')
  }

  
  async contactForm(formData : string){
    return await this.supabase.from('portfolio').insert(formData).select();
  }
}
