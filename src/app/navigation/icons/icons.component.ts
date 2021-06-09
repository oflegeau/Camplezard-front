import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  public tab = [0, 1, 2, 3, 4, 5, 6, 7,  8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  public tabType1 = [
                      ['','','fad','fad','fad',''],
                      ['fad','','','','fad','fad'],
                      ['fad','fad','fad','fad','fad','fad'],
                      ['fad','fad','fad','fad','fad','fad'],
                      ['fad','fad','fad','fad','fad','fad'],
                      ['fad','fad','fad','fad','fad','fad'],
                      ['fad','','fad','fad','fad','fad'],
                      ['fad','fad','fad','fad','fad','fad'],
                      ['fad','fad','fad','fad','fad','fad'],
                      ['fad','fad','fad','fad','fad','fad'],
                      ['fad','fad','fad','fad','fad','fad'],
                      ['fad','fad','fad','fad','fad','fad'],
                      ['fad','fad','fad','fad','fad','fad'],
                      ['fad','fad','fad','fad','fad','fad'],
                      ['fad','fad','fad','fad','fad','fad'],
                      ['fad','fad','fad','fad','fad','fad'],
                      ['fad','fad','fad','fad','fad','fad'],
                      ['fad','fad','fad','fad','fad','fad'],
                    ];
  public tabType2 = [
                      ['','','fal','fal','fal',''],
                      ['fal','','','','fal','fal'],
                      ['fal','fal','fal','fal','fal','fal'],
                      ['fal','fal','fal','fal','fal','fal'],
                      ['fal','fal','fal','fal','fal','fal'],
                      ['fal','fal','fal','fal','fal','fal'],
                      ['fal','','fal','fal','fal','fal'],
                      ['fal','fal','fal','fal','fal','fal'],
                      ['fal','fal','fal','fal','fal','fal'],
                      ['fal','fal','fal','fal','fal','fal'],
                      ['fal','fal','fal','fal','fal','fal'],
                      ['fal','fal','fal','fal','fal','fal'],
                      ['fal','fal','fal','fal','fal','fal'],
                      ['fal','fal','fal','fal','fal','fal'],
                      ['fal','fal','fal','fal','fal','fal'],
                      ['fal','fal','fal','fal','fal','fal'],
                      ['fal','fal','fal','fal','fal','fal'],
                      ['fal','fal','fal','fal','fal','fal'],
                      ['fal','fal','fal','fal','fal','fal'],
                    ];
  public tabType3 = [
                      ['','','fas','fas','fas',''],
                      ['fas','','','','fas','fas'],
                      ['fas','fas','fas','fas','fas','fas'],
                      ['fas','fas','fas','fas','fas','fas'],
                      ['fas','fas','fas','fas','fas','fas'],
                      ['fas','fas','fas','fas','fas','fas'],
                      ['fas','','fas','fas','fas','fas'],
                      ['fas','fas','fas','fas','fas','fas'],
                      ['fas','fas','fas','fas','fas','fas'],
                      ['fas','fas','fas','fas','fas','fas'],
                      ['fas','fas','fas','fas','fas','fas'],
                      ['fas','fas','fas','fas','fas','fas'],
                      ['fas','fas','fas','fas','fas','fas'],
                      ['fas','fas','fas','fas','fas','fas'],
                      ['fas','fas','fas','fas','fas','fas'],
                      ['fas','fas','fas','fas','fas','fas'],
                      ['fas','fas','fas','fas','fas','fas'],
                      ['fas','fas','fas','fas','fas','fas'],
  ];
  public tabIcon = [
      ['menu','zoom','ban','sort','sync','period'],
      ['create','change','remove','exit','link','unlink'],
      ['lock','unlock','rank','close','cancel','percent'],
      ['import-cloud','import-file','import','export','send','scan'],
      ['comment','info','phone','email','male','female'],
      ['trigram','name','surname','function','experience','presence'],
      ['parttime','watch','connect','disconnect','city','code'],
      ['amount','iteration','calculate','off','ts-imported','ts-assigned'],
      ['ts','ts-edit','ts-check','ts-warning','ts-error','ts-invoiced'],
      ['project','project-time','project-daas','project-fixed','struct','nf'],
      ['creation','start','end','delivery','days','prod'],
      ['turnover','invoiced','paid','margin','cost','contribute'],
      ['clients','client','prospect','action','contact','proposal'],
      ['contract','order','invoice','card', '', ''],
      ['member-team','member-internal','member-prod','member-internship','member-external','member-out'],
      ['parent','open','progress','wait','stop','done'],
      ['problem','follow','follow-more', 'follow-less', '', ''],
      ['history','chart','kpi','','', ''],
                  ];

  constructor() { }

  ngOnInit() {
  }

}
