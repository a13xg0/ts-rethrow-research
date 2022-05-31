class LowLevelError extends Error {}

class SpecificError extends Error {}

class DomainError extends Error {}


function doLowLevel() {
  throw new LowLevelError("Message occurred under the ground")
}


function someAbstraction() {
  try {
    doLowLevel()
  }
  catch(err) {
    if (err instanceof LowLevelError) {
      throw new SpecificError("There is specific error")
    }
  }
}


function businessLogic() {
  try {
    someAbstraction()
  }
  catch(err) {
   if (err instanceof SpecificError) {
     throw new DomainError("Business fails")
   }
  }
}


function main() {
 businessLogic()
}


main()

