import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../shared/user/user.service';
import * as d3 from 'd3';
import {DataSource} from '@angular/cdk/collections';
import {Data, Note} from '../models/domains';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit, OnDestroy {
  sessions: DataSource<any>;
  displayedColumns: any = ['id', 'dataUrl'];
  name = 'My patients location on map';
  lat = 51.678418;
  lng = 7.809007;
  notes: Array<Note>;
  testSessionId: number;

  constructor(private userService: UserService, private activeRoute: ActivatedRoute) {
  }

  isResearcher() {
    return 'researcher' === localStorage.getItem('role');

  }

  addNote(note: string) {
    this.userService.addNote(this.testSessionId, note).subscribe(notes => {
      this.notes = notes;
    });
  }


  ngOnInit() {
    this.sessions = new SessionDataSource(this.userService, this.activeRoute.snapshot.params['username']);
    this.userService.getUser(this.activeRoute.snapshot.params['username']).subscribe(data => {
      this.lat = data.lat;
      this.lng = data.longitude;
    });
    this.userService.getMe();


    d3.selectAll('svg').remove();
  }

  ngOnDestroy() {
    this.notes = new Array();
    this.testSessionId = null;
    // remove any existing graph.
    d3.selectAll('svg').remove();
  }


  setData(data: Array<Data>, notes: Array<Note>, testSessionId: number) {

    this.notes = notes;
    this.testSessionId = testSessionId;
    // remove any existing graph.
    d3.selectAll('svg').remove();

    // set the dimensions and margins of the graph
    const margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // Define the div for the tooltip
    const div = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    // set the ranges
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);


    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = d3.select('body').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform',
        'translate(' + margin.left + ',' + margin.top + ')');

    data.forEach(function (d) {
      d.X = +d.X;
      d.Y = +d.Y;
      d.time = d.time;
      d.button = d.button;
      d.correct = d.correct;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function (d) {
      return d.X;
    }));
    y.domain([0, d3.max(data, function (d) {
      return d.Y;
    })]);

    // Add the valueline path.
    svg.selectAll('dot')
      .data(data)
      .enter().append('circle')
      .attr('r', 3.5)
      .attr('cx', function (d) {
        return x(d.X);
      })
      .attr('cy', function (d) {
        return y(d.Y);
      })
      .on('mouseover', function (d) {
        div.transition()
          .duration(200)
          .style('opacity', .9);
        div.html('Time: ' + d.time + '<br>Button: ' + d.button + '<br>Correct: ' + d.correct)
          .style('left', (d3.event.pageX) + 'px')
          .style('top', (d3.event.pageY - 28) + 'px');
      })
      .on('mouseout', function (d) {
        div.transition()
          .duration(500)
          .style('opacity', 0);
      });
  }
}


export class SessionDataSource extends DataSource<any> {
  constructor(private userService: UserService, private username: string) {
    super();
  }

  connect(): Observable<Array<any>> {
    return this.userService.getSessionsOfPatient(this.username);
  }

  disconnect() {
  }
}
