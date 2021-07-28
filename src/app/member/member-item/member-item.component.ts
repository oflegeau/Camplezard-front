import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgSelectComponent} from '@ng-select/ng-select';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {Member, MemberResa} from '../../share/back-model/Member';
import {MemberService} from '../../share/service/member.service';
import {MemberListService} from '../../share/service/member.list.service';

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.scss']
})
export class MemberItemComponent implements OnInit, OnDestroy {

  // liste de members pour sélection de la page //
  public memberList: Member[];
  private subMember: Subscription;
  public members = [];
  public selectedIdMember: string;
  @ViewChild('refNgSelectMember') refNgSelectMember: NgSelectComponent;

  // données principales de la page //
  public memberResa: MemberResa;
  private subMemberResa: Subscription;

  constructor(private memberListService: MemberListService,
              private memberService: MemberService,
              private toastrService: ToastrService,
              private route: ActivatedRoute,
              private router: Router) {
    this.subMember = null;
    this.memberList = null;
    this.selectedIdMember = '';

    this.subMemberResa = null;
    this.memberResa = null;
  }

  ngOnInit() {
    // liste de members //
    this.selectedIdMember = this.route.snapshot.params.id;
    this.subMember = this.memberListService.get_obs().subscribe(data => {
      if (data) {
        this.memberList = data;
        this.members.splice(0, this.members.length);
        this.memberList.forEach(item => {
          this.members.push({id: item.id, name: item.name + ' ' + item.surname});
        });
      }
    });

    // variable de période glissante /
    this.subMemberResa = this.memberService.get_obs(this.selectedIdMember).subscribe(data => {
      if (data) {
        this.memberResa = data;
      }
    });
  }


  ngOnDestroy(): void {
    if (this.subMember) {
      this.subMember.unsubscribe();
    }
    if (this.subMemberResa) {
      this.subMemberResa.unsubscribe();
    }
  }

  /*--------------------------------------------------------------------*/

  onSelectMember(e: MouseEvent) {
    this.router.navigate(['/app/members/' + this.selectedIdMember]);
  }

  /*--------------------------------------------------------------------*/

  onCreateResa() {

  }
  onDeleteResa(line: number) {

  }
}
