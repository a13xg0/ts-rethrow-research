import { VError } from "verror"


class LowLevelError extends Error {}

class SpecificError extends VError {}

class DomainError extends VError {}


function doLowLevel() {
  throw new LowLevelError("Message occurred under the ground")
}


function someAbstraction() {
  try {
    doLowLevel()
  }
  catch(err) {
    if (err instanceof LowLevelError) {
      throw new SpecificError(err, "There is specific error")
    }
  }
}


function businessLogic() {
  try {
    someAbstraction()
  }
  catch(err) {
   if (err instanceof SpecificError) {
     throw new DomainError(err, "Business fails")
   }
  }
}


function main() {
 businessLogic()
}


main()

