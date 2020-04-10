import Link from "next/link";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/core";

export default function() {
  const router = useRouter();

  function isActive(path) {
    return path === router.pathname ? "active" : "";
  }

  return (
    <Flex width="40%">
      <nav>
        <Link href="/">
          <a className={isActive("/")}>Home</a>
        </Link>
        <Link href="/about">
          <a className={isActive("/about")}>About</a>
        </Link>
        <Link href="/contact">
          <a className={isActive("/contact")}>Contact</a>
        </Link>
        <Link href="/source">
          <a className={isActive("/source")}>Source</a>
        </Link>
      </nav>

      <style jsx>
        {`
          nav {
            display: flex;
            flex: 1;
            justify-content: space-between;
            padding-left: 10px;
            margin-bottom: 10px;
          }
          a {
            text-transform: uppercase;
            padding: 10px;
          }
          a:hover {
            font-weight: bolder;
          }
          a.active {
            font-weight: bold;
            border-bottom: 2px solid #000;
          }
        `}
      </style>
    </Flex>
  );
}
