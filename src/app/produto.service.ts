import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Produto } from './components/produto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  findAll():Observable<Produto[]> {
    const url = `${this.baseUrl}/produtos`
    return this.http.get<Produto[]>(url);
  }

  findById(idProduto: String): Observable<Produto> {
    const url = `${this.baseUrl}/produtos/${idProduto}`
    return this.http.get<Produto>(url);
  }

  create(produto: Produto): Observable<Produto> {
    const url = `${this.baseUrl}/produtos`
    return this.http.post<Produto>(url, produto);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}


