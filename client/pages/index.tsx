import axios from "axios";
import Link from "next/link";
import { Fragment } from "react";

export default function Home() {
  const Token = `asdfjklasdf`;
  const URL = "http://amazone";
  async function getRequest() {
    try {
      const res = await axios({
        method: "get",
        url: `${URL}`,
        headers: { Authorization: `Bearer ${Token}` },
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }
  async function postRequest() {
    try {
      const res = await axios({
        method: "post",
        url: `${URL}`,
        data: { id: "human001", password: "asdfqwer1234" },
        headers: { Authorization: `Bearer ${Token}` },
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }
  async function putRequest() {
    try {
      const res = await axios({
        method: "put",
        url: `${URL}`,
        data: { id: "human001", password: "asdfqwer1234" },
        headers: { Authorization: `Bearer ${Token}` },
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }
  async function patchRequest() {
    try {
      const res = await axios({
        method: "patch",
        url: `${URL}`,
        data: { id: "human001", password: "asdfqwer1234" },
        headers: { Authorization: `Bearer ${Token}` },
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }
  async function deleteRequest() {
    try {
      const res = await axios({
        method: "delete",
        url: `${URL}`,
        data: { id: "human001", password: "asdfqwer1234" },
        headers: { Authorization: `Bearer ${Token}` },
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Fragment>
      <Link href="/login">Login page</Link>

      <Link href="/signup">Sign up page</Link>
      <div>
        <button onClick={getRequest}>get</button>
      </div>
      <div>
        <button onClick={postRequest}>post</button>
      </div>
      <div>
        <button onClick={putRequest}>put</button>
      </div>
      <div>
        <button onClick={patchRequest}>patch</button>
      </div>
      <div>
        <button onClick={deleteRequest}>delete</button>
      </div>
    </Fragment>
  );
}
