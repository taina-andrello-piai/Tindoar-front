import { Component, OnInit } from '@angular/core';
import { Produto } from '../produto.model';
import { ProdutoService } from 'src/app/produto.service'
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-produto-post',
  templateUrl: './produto-post.component.html',
  styleUrls: ['./produto-post.component.css']
})
export class ProdutoPostComponent implements OnInit {

  produto: Produto = {
    nome: '',
    estado: '',
    status: '',
    categoria: '',
    cidade: '',
    fotos: '',
    descricao: '',
    dataCadastro: ''
  }

  nome = new FormControl('', [Validators.minLength(3)])
  estado = new FormControl('', [Validators.minLength(3)])
  status = new FormControl('', [Validators.minLength(3)])
  categoria = new FormControl('', [Validators.minLength(3)])
  cidade = new FormControl('', [Validators.minLength(3)])
  descricao = new FormControl('', [Validators.minLength(3)])


  constructor(private service: ProdutoService, private router: Router) { }

  ngOnInit(): void {
  }

  create(): void {
    this.service.create(this.produto).subscribe((_resposta) => {
      this.router.navigate(['produtos'])
      this.service.mensagem('Produto cadastrado com sucesso!');
    }, err => {
      for(let i = 0; i< err.error.errors.length; i++) {
        this.service.mensagem(err.error.errors[i].message)
      }
    })
  }

  cancelar(): void {
    window.history.back();
  }

  getMessage() {
    return false;
  }
}
