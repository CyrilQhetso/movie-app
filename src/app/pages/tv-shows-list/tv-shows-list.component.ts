import { Component } from '@angular/core';
import { TvShowCardComponent } from "../../shared/components/tv-show-card/tv-show-card.component";
import { EmptyStateComponent } from "../../shared/components/empty-state/empty-state.component";

@Component({
  selector: 'app-tv-shows-list',
  imports: [TvShowCardComponent, EmptyStateComponent],
  templateUrl: './tv-shows-list.component.html',
  styleUrl: './tv-shows-list.component.scss'
})
export class TvShowsListComponent {

}
