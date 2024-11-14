import moment from "moment";
import { USE_IMAGE_PLACEHOLDERS } from "../constants/paths";
import TableCell from "@mui/material/TableCell";

// split the description into readable paragraphs
export const splitIntoParagraphs = (text) => {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const paragraphs = [];
  for (let i = 0; i < sentences.length; i += 4) {
    paragraphs.push(sentences.slice(i, i + 4).join(" "));
  }
  return paragraphs;
};

// Assign "N.A" to empty or null values
export const assignValueNA = (obj, keys) => {
  keys.forEach(key => {
    if (!obj[key] || obj[key].trim() === '' || obj[key] === null) {
      obj[key] = 'N.A';
    }
  });
  return obj;
};

// Filter data to get the ones with the lowest coin_relations_id for each coin_slug and type
export const filterByLowestRelationId = (data) => {
  const filteredData = data.reduce((acc, data) => {
    const key = `${data.coin_slug}-${data.type}`;
    if (!acc[key] || acc[key].coin_relations_id > data.coin_relations_id) {
      acc[key] = data;
    }
    return acc;
  }, {});

  return Object.values(filteredData);
};

export const isValidEmail = (emailAddress) => {
  const pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  return pattern.test(emailAddress);
};

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const displayRedGreenColumn = (item, colorPalette, last = false) => {
  const num = (+item).toFixed(2);
  if (last) {
    if (num > 0) {
      return (
        <TableCell
          align="right"
          sx={{ color: colorPalette.green, pr: 4 }}
        >{`${num}%`}</TableCell>
      );
    } else {
      return (
        <TableCell
          align="right"
          sx={{ color: colorPalette.red, pr: 4 }}
        >{`${num}%`}</TableCell>
      );
    }
  }
  if (num > 0) {
    return (
      <TableCell
        align="right"
        sx={{ color: colorPalette.green }}
      >{`${num}%`}</TableCell>
    );
  } else {
    return (
      <TableCell
        align="right"
        sx={{ color: colorPalette.red }}
      >{`${num}%`}</TableCell>
    );
  }
};

export const formatToTimestampArray = (items) => {
  const dateArr = [];
  items.map((item) => {
    const newDate = new Date(item.x);
    dateArr.push([newDate.valueOf(), item.y]);
  });
  return dateArr;
};

export const getCustomDateTime = (
  value = 0,
  unit = "days",
  format = "HH:mm a | MMMM DD, YYYY"
) => {
  if (value === 0) {
    return moment().format(format);
  } else {
    return moment().add(value, unit).format(format);
  }
};

export const getDateElements = (date) => {
  const dateString = moment(date).format("dddd, MMMM DD YYYY, hh:mm A");
  const dateSections = dateString.split(",");
  const day = dateSections[0];
  const time = dateSections[2];
  const datePart = dateSections[1].trim().split(" ");
  return {
    day,
    time,
    date: {
      dateString: dateSections[1],
      month: datePart[0],
      date: datePart[1],
      year: datePart[2],
    },
  };
};

export const getAssetPath = (url, size) => {
  if (USE_IMAGE_PLACEHOLDERS) {
    return `https://via.placeholder.com/${size}.png`;
  }

  return url;
};
