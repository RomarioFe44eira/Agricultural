import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor() { }
  tiles: Tile[] = [
    {text: 'Bem vindo ao projeto Agricultural data box', cols: 4, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 8, color: 'lightgreen'},
    {text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vulputate lacus id malesuada dapibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum consectetur ornare nisl, nec ullamcorper erat sodales ac. Ut hendrerit tristique velit a gravida. Mauris pharetra dolor sed enim suscipit accumsan ullamcorper ac ante. Fusce maximus id augue id tempor. Curabitur pulvinar erat tortor, non vestibulum ex tristique ac. Quisque est lacus, blandit ac molestie quis, feugiat sed metus. Pellentesque porttitor diam quis ipsum placerat pretium. Morbi et augue pharetra, lobortis metus dignissim, tempus sem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque cursus mi nec quam finibus mollis. Nulla rutrum arcu in enim pretium, at aliquam nibh vestibulum. Nulla quis magna non velit suscipit lobortis. Nam ullamcorper, est at rhoncus laoreet, velit nibh fringilla erat, ut dignissim risus massa sed metus. Quisque vitae libero vel augue dignissim convallis. Phasellus vestibulum accumsan lectus in dictum. Aliquam cursus dui nec lorem varius fermentum. Mauris id dignissim nisl, vitae tristique ipsum. Morbi volutpat luctus velit ut maximus. Nullam mollis nisi ac quam accumsan convallis id quis lectus. Nunc sed pretium lorem. Nulla consequat est risus, id dignissim nisi accumsan quis. Suspendisse bibendum ligula leo, sit amet bibendum justo rhoncus ac. Quisque odio massa, consectetur ut lobortis eu, scelerisque nec sem. Proin ut urna sed ligula efficitur convallis ac at metus. Duis iaculis venenatis elit, non eleifend lacus iaculis eget. Aliquam condimentum vitae lacus eget sagittis. Pellentesque vel nisi pharetra ex mattis aliquam sit amet vel dolor. Integer vehicula est quis ullamcorper lacinia. Nunc efficitur, mi sed consequat venenatis, urna augue congue nulla, ac porta ante lacus eu libero. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In eget tortor auctor, bibendum nisi vel, gravida neque. Donec nec efficitur lorem. Integer purus nunc, iaculis aliquam enim nec, porta efficitur nibh. Duis vitae lorem leo. Duis sed facilisis orci. Donec in justo lacinia sapien egestas ornare. Mauris elit nunc, elementum a leo quis, scelerisque mattis est. Nunc in ultricies mauris, eget ultricies enim. Nunc lobortis suscipit magna. Aliquam sagittis lacus elit, vitae faucibus nibh varius nec. Curabitur accumsan risus a semper vestibulum. Nam ultrices velit ex, ut lacinia nisi dignissim sed. Aliquam feugiat eu nibh vel cursus. Proin fringilla, metus quis laoreet rutrum, mauris est bibendum ex, non lobortis augue nulla eu quam. Etiam ac velit tempor nisi accumsan gravida. Suspendisse a pretium leo, a iaculis nulla. Aenean dui ex, posuere a magna a, eleifend tristique nunc. Proin vitae aliquam sem, vel mollis turpis. Cras a quam id orci pellentesque porta. Pellentesque id lectus vel ex pellentesque accumsan. Nunc tincidunt convallis lorem at lacinia. Quisque ut pretium sem, molestie luctus urna. Nunc enim quam, ornare vel nulla ac, dapibus euismod risus. Aenean porta egestas velit, ac commodo metus aliquet id. Pellentesque et augue eu odio gravida sollicitudin in quis purus. Donec ullamcorper, diam nec dapibus convallis, diam leo mollis quam, nec ornare purus elit a arcu.', cols: 2, rows: 8, color: 'lightpink'},
    {text: 'Four', cols: 1, rows: 8, color: '#DDBDF1'},
  ];

  ngOnInit() {
  }

}
