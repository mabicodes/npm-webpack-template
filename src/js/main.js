import $ from 'jquery';

import {Counter} from "./counter";

let counter = new Counter()

$(document).ready(function () {
    $('#counter').text("No clicks! Start clicking!")
})

$('#clicker').click(function () {
    $('#counter').text(`--> The count is ${counter.incrementAndReturn()}`)
})