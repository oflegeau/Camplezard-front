import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {PageMember} from '../../share/back-model/PageMember';
import {Subject, Subscription} from 'rxjs';
import {DeleteConfirmation} from '../../share/front-model/DeleteConfirmation';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MemberCardPageService} from '../../share/service/memberCard.page.service';
import {AppISetting} from '../../share/interface/app.interface.setting';
import {Member, MemberCard} from '../../share/back-model/Member';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit, OnDestroy {

  nation = ['France', 'Espagne', 'Angleterre' ,'Allemagne','Autres'];

  members: PageMember;
  private subMembers: Subscription;
  typeMember: number[] = [0, 1, 2];
  private filterTypeValue: number;

  isFilter: boolean;
  sortAsc: boolean;
  private sortName: string;
  private sortCol: number;

  @ViewChildren('pages') pages: QueryList<any>;
  private itemsPerPage = 8;
  private numberOfVisiblePaginators = 4;
  numberOfPaginators: number;
  paginators: Array<any> = [];
  activePage = 1;
  firstVisiblePaginator = 0;
  lastVisiblePaginator = this.numberOfVisiblePaginators;

  private line: number;
  public eventsModalDelete: Subject<DeleteConfirmation> = new Subject<DeleteConfirmation>();
  public eventsModalMember: Subject<MemberCard> = new Subject<MemberCard>();

  constructor(private memberCardPageService: MemberCardPageService,
      private router: Router,
      private toastrService: ToastrService) {
    this.members = null;
    this.subMembers = null;

    this.filterTypeValue = 0;
    this.isFilter = false;
    this.sortAsc = true;
    this.sortName = 'name';
    this.sortCol = 1;
    this.line = -1;
  }

  /*--------------------------------------------------------------------*/
  /*                        INIT                                        */
  /*--------------------------------------------------------------------*/

  onRefresh() {
    if (this.activePage > 0) {
      this.memberCardPageService.get_obs(this.activePage - 1,
                                              this.itemsPerPage,
                                              this.filterTypeValue,
                                              this.sortAsc,
                                              this.sortName);
    }
  }

  ngOnInit() {
    if (this.activePage > 0) {
      this.subMembers = this.memberCardPageService.get_obs(this.activePage - 1,
          this.itemsPerPage,
          this.filterTypeValue,
          this.sortAsc,
          this.sortName).subscribe(data => {
            if (data) {
              this.members = data;
              if (this.members.totalPage !== this.numberOfPaginators) {
                this.initPaginators();
              }
            }
          },
          error => console.log(error),
          () => console.log('liste members'));
    }
  }

  ngOnDestroy(): void {
    if (this.subMembers) {
    this.subMembers.unsubscribe();
  }
}

  /*--------------------------------------------------------------------*/
  /*                           SELECTION                                */
  /*--------------------------------------------------------------------*/

  onSelect(id: string) {
    this.router.navigate(['/app/members/' + id]);
  }

  onTypeMember(i: number) {
    this.filterTypeValue = i;

    this.sortAsc = true;
    this.sortName = 'name';
    this.sortCol = 1;

    this.activePage = 1;
    this.onRefresh();
  }

  sortBy(by: string, col: number) {
    if (this.sortCol === col) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortCol = col;
      this.sortAsc = true;
    }

    this.activePage = 1;
    this.sortName = by;
    this.onRefresh();
  }

  /*--------------------------------------------------------------------*/
  /*                           Create                                   */
  /*--------------------------------------------------------------------*/

  onCreateMember() {
    this.eventsModalMember.next(null);
  }

  createMember(event: MemberCard) {
    this.memberCardPageService.create(event).then(() => {
          this.toastrService.success('<span class=" tim-icons icon-pencil"></span>Personne ajoutée',
              'Mise A jour de base', AppISetting.toastOptions);
          this.onRefresh();
        },
        (res) => console.log(res));
  }

  /*--------------------------------------------------------------------*/
  /*                           change                                   */
  /*--------------------------------------------------------------------*/

  onChangeMember(line: number) {
    if (line !== -1) {
      this.eventsModalMember.next(this.members.items[line]);
    }
  }

  changeMember(event: MemberCard) {
    this.memberCardPageService.update(event).then(
        () => {
          this.toastrService.info('<span class=" tim-icons icon-pencil"></span>Personne modifiée',
              'Mise A jour de la base', AppISetting.toastOptions);
        },
        (res) => console.log(res));
  }

  /*--------------------------------------------------------------------*/
  /*                       delete member                                */
  /*--------------------------------------------------------------------*/

  deleteMember(line: number) {
    if (line !== -1) {
      this.line = line;
      this.eventsModalDelete.next(new DeleteConfirmation(true, 'ATTENTION', 'Vous allez supprimer définitivement des données !', 0));
    }
  }

  confirmDelete(event : number) {
    if (this.line !== -1) {
      this.memberCardPageService.delete(this.members.items[this.line]).then(
          (reponse) => {
            if (reponse.ok === true) {
              this.toastrService.warning('<span class=" tim-icons icon-trash-simple"></span>Personne supprimée', 'Mise A jour de la Base',
                  AppISetting.toastOptions);
              this.onRefresh();
            } else {
              // tslint:disable-next-line:no-bitwise
              if ((reponse.code & 0x01) === 0x01) {
                this.toastrService.error('<span class=" tim-icons icon-alert-circle-exc"></span>Assignation présente',
                    'impossible de supprimer cette Personne', AppISetting.toastOptions);
              } else
                  // tslint:disable-next-line:no-bitwise
              if ((reponse.code & 0x02) === 0x02) {
                this.toastrService.error('<span class=" tim-icons icon-alert-circle-exc"></span>Facturation présente',
                    'impossible de supprimer cette Personne', AppISetting.toastOptions);
              } else {
                this.toastrService.error('<span class=" tim-icons icon-alert-circle-exc"></span>Erreur Inconnue',
                    'impossible de supprimer cette Personne', AppISetting.toastOptions);
              }
            }
          },
          (res) => console.log(res));
    }
  }

  /*--------------------------------------------------------------------*/
  /*                           PAGINATION                               */
  /*--------------------------------------------------------------------*/

  initPaginators() {
    this.activePage = 1;
    this.firstVisiblePaginator = 0;
    this.lastVisiblePaginator = this.numberOfVisiblePaginators;
    this.numberOfPaginators = this.members.totalPage;

    this.paginators.splice(0, this.paginators.length);
    for (let i = 1; i <= this.numberOfPaginators; i++) {
      this.paginators.push(i);
    }
  }

  changePage(event: any) {
    if (event.target.text >= 1 && event.target.text <= this.numberOfPaginators) {
      this.activePage = +event.target.text;
      this.onRefresh();
    }
  }

  nextPage() {
    if (this.activePage < this.numberOfPaginators) {
      if ((typeof this.pages.last !== 'undefined') && (this.pages.last.nativeElement.classList.contains('active'))) {
        if ((this.numberOfPaginators - this.numberOfVisiblePaginators) >= this.lastVisiblePaginator) {
          this.firstVisiblePaginator += this.numberOfVisiblePaginators;
          this.lastVisiblePaginator += this.numberOfVisiblePaginators;
        } else {
          this.firstVisiblePaginator += this.numberOfVisiblePaginators;
          this.lastVisiblePaginator = this.numberOfPaginators;
        }
      }

      this.activePage += 1;
      this.onRefresh();
    }
  }

  previousPage() {
    if (this.activePage > 1) {
      if ((typeof this.pages.first !== 'undefined') && (this.pages.first.nativeElement.classList.contains('active'))) {
        if ((this.lastVisiblePaginator - this.firstVisiblePaginator) === this.numberOfVisiblePaginators) {
          this.firstVisiblePaginator -= this.numberOfVisiblePaginators;
          this.lastVisiblePaginator -= this.numberOfVisiblePaginators;
        } else {
          this.firstVisiblePaginator -= this.numberOfVisiblePaginators;
          this.lastVisiblePaginator -= (this.numberOfPaginators % this.numberOfVisiblePaginators);
        }
      }

      this.activePage -= 1;
      this.onRefresh();
    }
  }

  firstPage() {
    this.activePage = 1;
    this.firstVisiblePaginator = 0;
    this.lastVisiblePaginator = this.numberOfVisiblePaginators;

    this.onRefresh();
  }

  lastPage() {
    this.activePage = this.numberOfPaginators;

    if (this.numberOfPaginators % this.numberOfVisiblePaginators === 0) {
      this.firstVisiblePaginator = this.numberOfPaginators - this.numberOfVisiblePaginators;
      this.lastVisiblePaginator = this.numberOfPaginators;
    } else {
      this.lastVisiblePaginator = this.numberOfPaginators;
      this.firstVisiblePaginator = this.lastVisiblePaginator - (this.numberOfPaginators % this.numberOfVisiblePaginators);
    }

    this.onRefresh();
  }

}
