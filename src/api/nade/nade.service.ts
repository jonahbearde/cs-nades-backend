import {
  OptionalUnlessRequiredId,
  InsertOneOptions,
  FindOptions,
  Filter,
} from "mongodb"
import { Nade, Nades } from "./nade.model"

export function createNade(
  doc: OptionalUnlessRequiredId<Nade>,
  options?: InsertOneOptions
) {
  console.log("doc", doc)
  return Nades.insertOne(doc, { ...options })
}

export function findNades(filter: Filter<Nade>) {
  return Nades.find(filter)
}
